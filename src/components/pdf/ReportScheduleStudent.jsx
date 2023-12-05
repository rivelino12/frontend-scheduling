import React from "react";
import {
  PDFDownloadLink,
  PDFViewer,
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import Logo from "../../assets/logo_kodekiddo.png";

const ReportScheduleStudent = ({ name, _class, subSchedules }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.header}>
        <Image src={Logo} style={styles.logo} />
        <Text style={styles.companyName}>Kode Kiddo Manado</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Nama : {name}</Text>
        <Text style={styles.infoText}>Kelas : {_class}</Text>
      </View>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          {["No", "Tanggal", "Pertemuan", "Materi", "Deskripsi", "Gambar"].map(
            (header, index) => (
              <Text key={index} style={styles.columnHeader}>
                {header}
              </Text>
            )
          )}
        </View>
        {subSchedules.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            {[
              index + 1,
              item.date,
              `Pertemuan ${index + 1}`,
              item.material,
              null,
              "",
            ].map((cell, i) => (
              <Text key={i} style={styles.columnCell}>
                {cell}
              </Text>
            ))}
            <Image source={{ uri: item.url }} style={styles.imageCell} />
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "center",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "center",
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  companyName: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  infoText: {
    fontSize: 15,
    textAlign: "center",
  },
  imageCell: {
    width: 40,
    height: 40,
    padding: 4,
    resizeMode: "center",
    paddingHorizontal: 4,
    paddingVertical: 4,
    flex: 0.8,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  columnHeader: {
    backgroundColor: "#f0f0f0",
    fontSize: 10,
    fontWeight: "bold",
    padding: 5,
    flex: 1,
    textAlign: "center",
    borderStyle: "solid",
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  columnCell: {
    fontSize: 10,
    flex: 1,
    textAlign: "center",
    borderStyle: "solid",
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
});

export default ReportScheduleStudent;
