import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

export default function AuthChoiceScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#0B1020', '#09133D', '#03071E']}
      locations={[0.1, 0.6, 1]}
      style={styles.container}
    >
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          
          {/* Topo / Header com Logo e Subtítulo */}
          <View style={styles.header}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoLetter}>F.</Text>
            </View>
            <View>
              <Text style={styles.brandTitle}>Focus</Text>
              <Text style={styles.brandSubtitle}>SUA JORNADA DE CONCENTRAÇÃO</Text>
            </View>
          </View>

          {/* Mascote Central (Byte) */}
          <View style={styles.mascotContainer}>
            <Image
              source={require('../../assets/images/byte.png')}
              style={styles.mascotImage}
              resizeMode="contain"
            />
          </View>

          {/* Textos de Chamada */}
          <View style={styles.textSection}>
            <Text style={styles.mainTitle}>
              Vamos começar sua evolução?
            </Text>
            <Text style={styles.subtitle}>
              Byte, seu companheiro digital, ajudará você a gerenciar tarefas, tempo de tela e conquistar um novo foco.
            </Text>
          </View>

          {/* Botões de Ação */}
          <View style={styles.buttonGroup}>
            {/* Botão Primário: Criar conta */}
            <TouchableOpacity 
              style={styles.primaryButton}
              activeOpacity={0.85}
              onPress={() => router.push('/register')}
            >
              <Text style={styles.primaryButtonText}>Criar minha conta</Text>
            </TouchableOpacity>

            {/* Botão Secundário: Continuar com o Google */}
            <TouchableOpacity 
              style={styles.googleButton}
              activeOpacity={0.85}
              onPress={() => alert('Login com Google em desenvolvimento!')}
            >
              <AntDesign name="google" size={20} color="#1E293B" style={styles.googleIcon} />
              <Text style={styles.googleButtonText}>Continuar com o Google</Text>
            </TouchableOpacity>

            {/* Link para Login */}
            <View style={styles.loginLinkContainer}>
              <Text style={styles.alreadyHaveAccountText}>Já possui uma conta? </Text>
              <TouchableOpacity onPress={() => router.push('/login')}>
                <Text style={styles.loginLinkText}>Entrar</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Card de Parceiro de Hábitos (Study Bunny) */}
          <View style={styles.partnerSection}>
            <Text style={styles.partnerHeader}>INTEGRAÇÃO COM PARCEIROS DE HÁBITOS</Text>
            
            <View style={styles.partnerCard}>
              <View style={styles.partnerInfo}>
                {/* Ícone de coelho simulado ou imagem */}
                <View style={styles.partnerIconBox}>
                  <Text style={styles.partnerEmoji}>🐰</Text>
                </View>
                <View style={styles.partnerTextContainer}>
                  <Text style={styles.partnerTitle}>Study Bunny • Foco</Text>
                  <Text style={styles.partnerSubtitle}>Conecte seu pet de estudos ao Focus</Text>
                  <Text style={styles.stars}>★★★★★</Text>
                </View>
              </View>

              <TouchableOpacity 
                style={styles.obtainButton}
                activeOpacity={0.85}
              >
                <Text style={styles.obtainButtonText}>OBTER</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
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
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 28,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
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
    fontSize: 20,
    fontWeight: '700',
  },
  brandSubtitle: {
    color: '#38BDF8',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  mascotContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  mascotImage: {
    width: 170,
    height: 170,
  },
  textSection: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  mainTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  buttonGroup: {
    gap: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: '#0055FF',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0055FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  googleIcon: {
    marginRight: 4,
  },
  googleButtonText: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '600',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  alreadyHaveAccountText: {
    color: '#94A3B8',
    fontSize: 13,
  },
  loginLinkText: {
    color: '#38BDF8',
    fontSize: 13,
    fontWeight: '700',
  },
  partnerSection: {
    marginTop: 6,
  },
  partnerHeader: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 10,
  },
  partnerCard: {
    backgroundColor: '#0B1333',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  partnerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  partnerIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFEDD5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  partnerEmoji: {
    fontSize: 24,
  },
  partnerTextContainer: {
    flex: 1,
  },
  partnerTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  partnerSubtitle: {
    color: '#94A3B8',
    fontSize: 10,
    marginTop: 2,
  },
  stars: {
    color: '#FACC15',
    fontSize: 10,
    marginTop: 2,
  },
  obtainButton: {
    backgroundColor: '#E2E8F0',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  obtainButtonText: {
    color: '#0F172A',
    fontSize: 11,
    fontWeight: '700',
  },
});