import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'

const themeColor = '#2A52BE'

const styles = StyleSheet.create({
  page: { padding: 36, fontSize: 12, fontFamily: 'Helvetica' },
  section: { marginBottom: 22 },
  header: {
    fontSize: 26,
    color: themeColor,
    fontWeight: 700,
    marginBottom: 4,
  },
  subHeader: {
    fontSize: 15,
    marginBottom: 8,
    color: themeColor,
    fontWeight: 700,
    paddingLeft: 6,
    borderLeftWidth: 3,
    borderLeftColor: themeColor,
    borderLeftStyle: 'solid',
  },
  text: { marginBottom: 5 },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#E6E9EF',
    marginVertical: 8,
  },
  photoWrap: { alignItems: 'center', marginBottom: 12, marginTop: 8 },
  photo: {
    width: 90,
    height: 90,
    marginBottom: 0,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: themeColor,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 7,
    marginTop: 1,
  },
  contact: { fontSize: 10, color: '#444', marginRight: 18, marginBottom: 2 },
  label: { fontWeight: 600 },
  small: { fontSize: 10, color: '#888', marginBottom: 2 },
  listItem: { marginBottom: 7, marginLeft: 6 },
})

const getFullName = (d: any) =>
  [d.titulBefore, d.firstName, d.lastName, d.titulAfter].filter(Boolean).join(' ')

export const CvPdfDocument = ({ cvData, photoPreview }: any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {photoPreview && (
        <View style={styles.photoWrap}>
          <Image src={photoPreview} style={styles.photo} />
        </View>
      )}

      {/* NAME & CONTACT */}
      <View style={styles.section}>
        <Text style={styles.header}>{getFullName(cvData)}</Text>
        <View style={styles.contactRow}>
          {cvData.email && <Text style={styles.contact}>{cvData.email}</Text>}
          {cvData.phone && <Text style={styles.contact}>{cvData.phone}</Text>}
          {cvData.website && (
            <Text style={styles.contact}>
              {cvData.website.replace(/^https?:\/\//, '')}
            </Text>
          )}
          {cvData.birthDate && (
            <Text style={styles.contact}>Narozen: {cvData.birthDate}</Text>
          )}
          {cvData.gender && (
            <Text style={styles.contact}>Pohlaví: {cvData.gender}</Text>
          )}
          {cvData.maritalStatus && (
            <Text style={styles.contact}>Stav: {cvData.maritalStatus}</Text>
          )}
        </View>
      </View>

      {(cvData.street || cvData.city || cvData.zip || cvData.region || cvData.state) && (
        <View style={styles.section}>
          <Text style={styles.subHeader}>Adresa</Text>
          <Text style={styles.text}>
            {[cvData.street, cvData.zip, cvData.city, cvData.region, cvData.state]
              .filter(Boolean)
              .join(', ')}
          </Text>
        </View>
      )}

      <View style={styles.line} />

      {/* EDUCATION */}
      {cvData.education && cvData.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subHeader}>Vzdělání</Text>
          {cvData.education.map((edu: any, idx: number) => (
            <View key={idx} style={styles.listItem}>
              <Text style={styles.label}>{edu.school}</Text>
              <Text>
                {edu.degree}
                {edu.field ? `, ${edu.field}` : ''}
              </Text>
              <Text style={styles.small}>
                {edu.startYear} – {edu.endYear}
              </Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.line} />

      {/* WORK EXPERIENCE */}
      {cvData.workExperience && cvData.workExperience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subHeader}>Pracovní zkušenosti</Text>
          {cvData.workExperience.map((exp: any, idx: number) => (
            <View key={idx} style={styles.listItem}>
              <Text style={styles.label}>
                {exp.position}
                {exp.company ? (
                  <Text style={styles.small}> @ {exp.company}</Text>
                ) : null}
              </Text>
              {exp.description && (
                <Text style={styles.text}>{exp.description}</Text>
              )}
              <Text style={styles.small}>
                {exp.startDate} – {exp.endDate}
              </Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.line} />

      {/* OTHER EXPERIENCE */}
      {cvData.otherExperience && (
        <View style={styles.section}>
          <Text style={styles.subHeader}>
            Další profesní zkušenosti, reference
          </Text>
          <Text style={styles.text}>{cvData.otherExperience}</Text>
        </View>
      )}

      {/* LANGUAGES */}
      {cvData.languages && cvData.languages.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subHeader}>Jazyky</Text>
          {cvData.languages.map((lang: any, idx: number) => (
            <Text style={styles.text} key={idx}>
              <Text style={styles.label}>{lang.language}:</Text> {lang.level}
            </Text>
          ))}
        </View>
      )}

      {/* DRIVER LICENSE */}
      {cvData.driverLicense && cvData.driverLicense.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subHeader}>Řidičský průkaz</Text>
          <Text style={styles.text}>{cvData.driverLicense.join(', ')}</Text>
        </View>
      )}
    </Page>
  </Document>
)
