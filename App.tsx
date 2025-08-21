import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { FAB, Portal, Provider } from "react-native-paper";

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

  const renderItem = ({ item }: { item: Vital }) => (
    <View style={styles.card}>
      <Text style={styles.date}>
        {new Date(item.created_at).toLocaleString()}
      </Text>
      <View style={styles.row}>
        {item.temperature_c && (
          <View style={[styles.pill, { backgroundColor: "#1e3a8a" }]}>
            <Ionicons name="thermometer" size={16} color="#93c5fd" />
            <Text style={styles.pillText}>{item.temperature_c} °C</Text>
          </View>
        )}
        {item.systolic && item.diastolic && (
          <View style={[styles.pill, { backgroundColor: "#065f46" }]}>
            <MaterialCommunityIcons name="blood-bag" size={16} color="#34d399" />
            <Text style={styles.pillText}>
              {item.systolic}/{item.diastolic} mmHg
            </Text>
          </View>
        )}
        {item.heart_rate && (
          <View style={[styles.pill, { backgroundColor: "#9d174d" }]}>
            <Ionicons name="heart" size={16} color="#f472b6" />
            <Text style={styles.pillText}>{item.heart_rate} lpm</Text>
          </View>
        )}
        {item.notes && (
          <View style={[styles.pill, { backgroundColor: "#6d28d9" }]}>
            <MaterialCommunityIcons
              name="note-text-outline"
              size={16}
              color="#a78bfa"
            />
            <Text style={styles.pillText}>{item.notes}</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        {lastRecord && (
          <View style={styles.summary}>
            <Text style={styles.summaryTitle}>Último registro</Text>
            <View style={styles.kpiRow}>
              <View style={[styles.kpiCard, { borderColor: "#1e3a8a" }]}>
                <Text style={styles.kpiTitle}>Temperatura</Text>
                <Text style={styles.kpiValue}>{lastRecord.temperature_c ?? "--"} °C</Text>
              </View>
              <View style={[styles.kpiCard, { borderColor: "#065f46" }]}>
                <Text style={styles.kpiTitle}>Presión</Text>
                <Text style={styles.kpiValue}>
                  {lastRecord.systolic && lastRecord.diastolic
                    ? `${lastRecord.systolic}/${lastRecord.diastolic} mmHg`
                    : "--"}
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
            onPress={() => console.log("Abrir formulario")}
          />
        </Portal>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a" },
  summary: { marginBottom: 20, padding: 16 },
  summaryTitle: { color: "#fff", fontWeight: "700", fontSize: 20, marginBottom: 12 },
  kpiRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  kpiCard: { flex: 1, padding: 12, borderWidth: 2, borderRadius: 16, marginHorizontal: 4, alignItems: "center", backgroundColor: "#1e293b" },
  kpiTitle: { color: "#cbd5e1", fontSize: 14, fontWeight: "600" },
  kpiValue: { color: "#fff", fontSize: 20, fontWeight: "800", marginTop: 4 },

  sectionTitle: { color: "#fff", fontSize: 18, fontWeight: "600", marginBottom: 12 },
  card: { backgroundColor: "#1e293b", padding: 14, borderRadius: 16, marginBottom: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3, elevation: 2 },
  date: { fontSize: 12, color: "#94a3b8", marginBottom: 8 },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  pill: { flexDirection: "row", alignItems: "center", borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  pillText: { marginLeft: 6, color: "#fff", fontSize: 13 },

  fab: { position: "absolute", right: 16, bottom: 16, backgroundColor: "#3b82f6" },
});

export default Dashboard;
