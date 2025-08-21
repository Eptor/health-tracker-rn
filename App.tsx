import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { FAB, Portal, Provider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

type Vital = {
  id: string;
  temperature_c: number | null;
  systolic: number | null;
  diastolic: number | null;
  heart_rate: number | null;
  notes?: string;
  created_at: string;
};

const Dashboard = () => {
  const [data, setData] = useState<Vital[]>([
    {
      id: "1",
      temperature_c: 37.2,
      systolic: 120,
      diastolic: 80,
      heart_rate: 72,
      notes: "Todo normal",
      created_at: new Date().toISOString(),
    },
  ]);

  const lastRecord = data[0];

  const [modalVisible, setModalVisible] = useState(false);
  const [temperature, setTemperature] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [notes, setNotes] = useState("");

  const addRecord = () => {
    const newRecord: Vital = {
      id: (data.length + 1).toString(),
      temperature_c: Number(temperature),
      systolic: Number(systolic),
      diastolic: Number(diastolic),
      heart_rate: Number(heartRate),
      notes: notes || undefined,
      created_at: new Date().toISOString(),
    };
    setData([newRecord, ...data]);
    setModalVisible(false);
    setTemperature("");
    setHeartRate("");
    setSystolic("");
    setDiastolic("");
    setNotes("");
  };

  const renderItem = ({ item }: { item: Vital }) => (
    <View style={styles.card}>
      <Text style={styles.date}>{new Date(item.created_at).toLocaleString()}</Text>
      <View style={styles.row}>
        <View style={[styles.pill, { backgroundColor: "#1e3a8a" }]}>
          <Ionicons name="thermometer" size={16} color="#93c5fd" />
          <Text style={styles.pillText}>{item.temperature_c ?? "--"} °C</Text>
        </View>
        <View style={[styles.pill, { backgroundColor: "#065f46" }]}>
          <MaterialCommunityIcons name="blood-bag" size={16} color="#34d399" />
          <Text style={styles.pillText}>
            {item.systolic}/{item.diastolic} mmHg
          </Text>
        </View>
        <View style={[styles.pill, { backgroundColor: "#9d174d" }]}>
          <Ionicons name="heart" size={16} color="#f472b6" />
          <Text style={styles.pillText}>{item.heart_rate ?? "--"} lpm</Text>
        </View>
        {item.notes ? (
          <View style={[styles.pill, { backgroundColor: "#6d28d9" }]}>
            <MaterialCommunityIcons name="note-text-outline" size={16} color="#a78bfa" />
            <Text style={styles.pillText}>{item.notes}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );

  return (
    <Provider>
      <StatusBar style="light" />
      <SafeAreaView style={styles.container}>
        {lastRecord && (
          <View style={styles.summary}>
            <Text style={styles.summaryTitle}>Último registro</Text>
            <View style={styles.kpiColumn}>
              <View style={[styles.kpiCard, { borderColor: "#1e3a8a" }]}>
                <Text style={styles.kpiTitle}>Temperatura</Text>
                <Text style={styles.kpiValue}>{lastRecord.temperature_c ?? "--"} °C</Text>
              </View>
              <View style={[styles.kpiCard, { borderColor: "#065f46" }]}>
                <Text style={styles.kpiTitle}>Presión</Text>
                <Text style={styles.kpiValue}>
                  {lastRecord.systolic}/{lastRecord.diastolic ?? "--"} mmHg
                </Text>
              </View>
              <View style={[styles.kpiCard, { borderColor: "#9d174d" }]}>
                <Text style={styles.kpiTitle}>Ritmo</Text>
                <Text style={styles.kpiValue}>{lastRecord.heart_rate ?? "--"} lpm</Text>
              </View>
            </View>
          </View>
        )}

        <View style={{ padding: 16 }}>
          <Text style={styles.sectionTitle}>Historial</Text>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <Portal>
          <FAB
            icon="plus"
            style={styles.fab}
            onPress={() => setModalVisible(true)}
          />
        </Portal>

        <Modal
          visible={modalVisible}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Nuevo Registro</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={28} color="#fff" />
              </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <TextInput
                placeholder="Temperatura (°C)"
                placeholderTextColor="#94a3b8"
                style={styles.input}
                value={temperature}
                onChangeText={setTemperature}
                keyboardType="numeric"
              />
              <TextInput
                placeholder="Presión sistólica"
                placeholderTextColor="#94a3b8"
                style={styles.input}
                value={systolic}
                onChangeText={setSystolic}
                keyboardType="numeric"
              />
              <TextInput
                placeholder="Presión diastólica"
                placeholderTextColor="#94a3b8"
                style={styles.input}
                value={diastolic}
                onChangeText={setDiastolic}
                keyboardType="numeric"
              />
              <TextInput
                placeholder="Ritmo cardiaco"
                placeholderTextColor="#94a3b8"
                style={styles.input}
                value={heartRate}
                onChangeText={setHeartRate}
                keyboardType="numeric"
              />
              <TextInput
                placeholder="Notas"
                placeholderTextColor="#94a3b8"
                style={[styles.input, { height: 80 }]}
                value={notes}
                onChangeText={setNotes}
                multiline
              />
              <TouchableOpacity style={styles.saveButton} onPress={addRecord}>
                <Text style={styles.saveButtonText}>Guardar</Text>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a" },
  summary: { marginBottom: 20, padding: 16 },
  summaryTitle: { color: "#fff", fontWeight: "700", fontSize: 20, marginBottom: 12 },
  kpiColumn: { flexDirection: "column" },
  kpiCard: {
    padding: 12,
    borderWidth: 2,
    borderRadius: 16,
    marginHorizontal: 4,
    marginBottom: 12,
    alignItems: "center",
    backgroundColor: "#1e293b",
    minHeight: 80,
    justifyContent: "center",
  },
  kpiTitle: { color: "#cbd5e1", fontSize: 14, fontWeight: "600" },
  kpiValue: { color: "#fff", fontSize: 20, fontWeight: "800", marginTop: 4 },

  sectionTitle: { color: "#fff", fontSize: 18, fontWeight: "600", marginBottom: 12 },
  card: {
    backgroundColor: "#1e293b",
    padding: 14,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 2,
  },
  date: { fontSize: 12, color: "#94a3b8", marginBottom: 8 },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  pill: { flexDirection: "row", alignItems: "center", borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  pillText: { marginLeft: 6, color: "#fff", fontSize: 13 },

  fab: { position: "absolute", right: 16, bottom: 60, backgroundColor: "#3b82f6" },

  modalContainer: { flex: 1, backgroundColor: "#0f172a" },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
    alignItems: "center",
  },
  modalTitle: { color: "#fff", fontSize: 20, fontWeight: "700" },
  modalContent: { padding: 16, paddingBottom: 40 },
  input: {
    backgroundColor: "#1e293b",
    color: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: "#3b82f6",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  saveButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});

export default Dashboard;
