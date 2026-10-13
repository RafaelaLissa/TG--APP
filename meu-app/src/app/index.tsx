import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#0B1020', '#09133D', '#03071E']}
      locations={[0.1, 0.6, 1]}
      style={styles.container}
    >
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        
        {/* Header com Logo e Nome */}
        <View style={styles.header}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoLetter}>F.</Text>
          </View>
          <Text style={styles.brandTitle}>Focus</Text>
        </View>

        {/* Mascote Central (Byte) */}
        <View style={styles.mascotContainer}>
          <Image
            source={require('../../assets/images/byte.png')}
            style={styles.mascotImage}
            resizeMode="contain"
          />
        </View>

        {/* Textos de Apresentação */}
        <View style={styles.textSection}>
          <Text style={styles.badgeText}>UM NOVO COMEÇO, COM COMPANHIA</Text>
          
          <Text style={styles.mainTitle}>
            Seu foco.{'\n'}No seu ritmo.
          </Text>

          <Text style={styles.subtitle}>
            Pequenas conquistas viram bons hábitos.{'\n'}
            O Byte acompanha você nessa jornada.
          </Text>
        </View>

        {/* Botão de Ação e Frase de Rodapé */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={() => router.push('/auth-choice')}
          >
            <Text style={styles.buttonText}>Vamos começar</Text>
          </TouchableOpacity>

          <Text style={styles.footerNote}>
            Um passo de cada vez. Do seu jeito.
          </Text>
        </View>

      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: 'space-between',
    paddingVertical: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 10,
  },
  logoBadge: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#0055FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoLetter: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  mascotContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  mascotImage: {
    width: 250,
    height: 250,
  },
  textSection: {
    gap: 12,
  },
  badgeText: {
    color: '#4CC9F0',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  mainTitle: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
    lineHeight: 40,
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 15,
    lineHeight: 22,
  },
  footer: {
    gap: 14,
    alignItems: 'center',
    marginBottom: 8,
  },
  primaryButton: {
    backgroundColor: '#0055FF',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0055FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  footerNote: {
    color: '#64748B',
    fontSize: 13,
  },
});