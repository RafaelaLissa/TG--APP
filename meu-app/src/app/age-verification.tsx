import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';

type StepType = 'intro' | 'scanning' | 'adult' | 'minor';

export default function AgeVerificationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ dataNasc?: string }>();

  // Gerenciamento de permissão da câmera
  const [permission, requestPermission] = useCameraPermissions();

  const [step, setStep] = useState<StepType>('intro');
  const [progress, setProgress] = useState(0);

   // Função matemática para calcular se é maior ou menor de 18 anos
  const verificarSeMaiorDeIdade = (dataStr?: string) => {
    if (!dataStr) return false;

    let dia = 0, mes = 0, ano = 0;

    // Se digitou com barras: 05/04/2005
    if (dataStr.includes('/')) {
      const partes = dataStr.split('/');
      dia = parseInt(partes[0], 10);
      mes = parseInt(partes[1], 10) - 1;
      ano = parseInt(partes[2], 10);
    } 
    // Se digitou só os números: 05042005
    else if (dataStr.length === 8) {
      dia = parseInt(dataStr.substring(0, 2), 10);
      mes = parseInt(dataStr.substring(2, 4), 10) - 1;
      ano = parseInt(dataStr.substring(4, 8), 10);
    } else {
      return false;
    }

    const hoje = new Date();
    const nasc = new Date(ano, mes, dia);
    let idade = hoje.getFullYear() - nasc.getFullYear();
    const m = hoje.getMonth() - nasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) {
      idade--;
    }

    return idade >= 18;
  };
  const startVerification = () => {
    setStep('scanning');
    setProgress(0);
  };

  useEffect(() => {
    if (step === 'scanning') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            const ehMaior = verificarSeMaiorDeIdade(params.dataNasc);
            setStep(ehMaior ? 'adult' : 'minor');
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [step, params.dataNasc]);

  const getBadgeText = () => {
    if (step === 'intro') return 'Única etapa';
    if (step === 'scanning') return 'Verificando';
    if (step === 'adult') return 'Concluído';
    return 'Resultado';
  };

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

          {/* Topo / Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.circleButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={18} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>{getBadgeText()}</Text>
            </View>

            <TouchableOpacity>
              <Text style={styles.helpText}>
                {step === 'adult' ? 'Privacidade' : 'Ajuda'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* ======================================================== */}
          {/* TELA 1: INTRO (CÂMERA AO VIVO)                           */}
          {/* ======================================================== */}
          {step === 'intro' ? (
            <View key="intro" style={styles.content}>
              <View style={styles.tagRow}>
                <Ionicons name="lock-closed-outline" size={14} color="#38BDF8" />
                <Text style={styles.tagText}>VERIFICAÇÃO DE IDADE SEGURA</Text>
              </View>

              <Text style={styles.title}>Confirme sua idade com uma selfie</Text>
              <Text style={styles.subtitle}>
                Posicione o rosto dentro do contorno. Retire óculos escuros e escolha um local bem iluminado.
              </Text>

              {/* Moldura da Câmera Real */}
              <View style={styles.cameraFrame}>
                {permission?.granted ? (
                  <CameraView 
                    style={styles.liveCamera} 
                    facing="front"
                  />
                ) : (
                  <View style={styles.permissionBox}>
                    <Ionicons name="camera-reverse-outline" size={36} color="#38BDF8" />
                    <TouchableOpacity 
                      style={styles.permissionBtn}
                      onPress={requestPermission}
                    >
                      <Text style={styles.permissionBtnText}>Ativar Câmera</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {/* Sobreposição do Design do Figma */}
                <View style={styles.statusPill}>
                  <View style={styles.greenDot} />
                  <Text style={styles.statusPillText}>Câmera pronta</Text>
                </View>

                <View style={styles.faceOvalGuide}>
                  <Ionicons name="person-outline" size={80} color="rgba(255,255,255,0.4)" />
                </View>

                <View style={styles.cameraBottomPill}>
                  <Ionicons name="scan-outline" size={14} color="#FFF" />
                  <Text style={styles.cameraBottomText}>Rosto centralizado e bem iluminado</Text>
                </View>
              </View>

              <Text style={styles.instructionText}>
                ☀️ Mantenha uma expressão neutra e olhe para a câmera
              </Text>

              <View style={styles.privacyCard}>
                <Ionicons name="shield-checkmark-outline" size={20} color="#38BDF8" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.privacyTitle}>Sua imagem fica protegida</Text>
                  <Text style={styles.privacySubtitle}>
                    Usamos a captura apenas para verificar se você é menor ou maior de idade. Ela é criptografada e excluída depois.
                  </Text>
                </View>
              </View>

              <TouchableOpacity 
                style={styles.primaryButton}
                activeOpacity={0.85}
                onPress={startVerification}
              >
                <Ionicons name="camera-outline" size={18} color="#FFF" style={{ marginRight: 8 }} />
                <Text style={styles.primaryButtonText}>Iniciar verificação</Text>
              </TouchableOpacity>

              <Text style={styles.footerHelp}>
                Precisa de ajuda? <Text style={styles.linkText}>Falar com o suporte</Text>
              </Text>
            </View>
          ) : null}

          {/* ======================================================== */}
          {/* TELA 2: ESCANEANDO AO VIVO                               */}
          {/* ======================================================== */}
          {step === 'scanning' ? (
            <View key="scanning" style={styles.content}>
              <View style={styles.tagRow}>
                <Ionicons name="scan" size={14} color="#38BDF8" />
                <Text style={styles.tagText}>VERIFICAÇÃO DE IDADE SEGURA</Text>
              </View>

              <Text style={styles.title}>Verificação em andamento</Text>
              <Text style={styles.subtitle}>
                Estamos analisando sua selfie. Mantenha o rosto dentro do contorno por alguns segundos.
              </Text>

              <View style={styles.cameraFrame}>
                {permission?.granted && (
                  <CameraView 
                    style={styles.liveCamera} 
                    facing="front"
                  />
                )}

                <View style={styles.statusPill}>
                  <View style={styles.blueDot} />
                  <Text style={styles.statusPillText}>Analisando rosto</Text>
                </View>

                <View style={styles.faceOvalGuide}>
                  <View style={styles.laserLine} />
                  <Ionicons name="person-outline" size={80} color="rgba(255,255,255,0.6)" />
                </View>

                <View style={styles.cameraBottomPill}>
                  <Text style={styles.cameraBottomText}>Permaneça imóvel e olhe para a câmera</Text>
                </View>
              </View>

              <View style={styles.progressContainer}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressTitle}>Confirmando sua idade</Text>
                  <Text style={styles.progressPercentage}>{progress}%</Text>
                </View>
                <View style={styles.progressBarBackground}>
                  <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
                </View>
                <Text style={styles.progressHelper}>
                  Não feche esta tela. Isso costuma levar menos de 10 segundos.
                </Text>
              </View>

              <Text style={styles.securityText}>
                🔒 Sua imagem continua criptografada e protegida.
              </Text>
            </View>
          ) : null}

          {/* ======================================================== */}
          {/* TELA 3: MAIOR DE IDADE                                   */}
          {/* ======================================================== */}
          {step === 'adult' ? (
            <View key="adult" style={styles.resultContent}>
              <View style={styles.successIconCircle}>
                <Ionicons name="checkmark-circle" size={54} color="#0055FF" />
              </View>

              <Text style={styles.title}>Idade confirmada</Text>
              <Text style={[styles.subtitle, { textAlign: 'center' }]}>
                Tudo certo! Identificamos que você é maior de idade e sua conta está pronta para continuar.
              </Text>

              <View style={styles.infoCard}>
                <View style={styles.infoIconBox}>
                  <Ionicons name="person" size={20} color="#0055FF" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.infoCardTitle}>Maior de idade</Text>
                  <Text style={styles.infoCardSubtitle}>
                    Acesso liberado conforme as configurações da sua conta.
                  </Text>
                </View>
                <Ionicons name="checkmark-circle" size={20} color="#38BDF8" />
              </View>

              <View style={styles.privacyCard}>
                <Ionicons name="shield-checkmark-outline" size={20} color="#38BDF8" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.privacyTitle}>Sua privacidade foi respeitada</Text>
                  <Text style={styles.privacySubtitle}>
                    A selfie foi usada apenas para esta verificação e será excluída.
                  </Text>
                </View>
              </View>

              <TouchableOpacity 
                style={styles.primaryButton}
                activeOpacity={0.85}
                onPress={() => alert('Parabéns! Entrando no app Focus!')}
              >
                <Text style={styles.primaryButtonText}>Continuar no Focus</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {/* ======================================================== */}
          {/* TELA 4: MENOR DE IDADE                                   */}
          {/* ======================================================== */}
          {step === 'minor' ? (
            <View key="minor" style={styles.resultContent}>
              <View style={styles.minorIconCircle}>
                <Ionicons name="shield-half-outline" size={50} color="#F59E0B" />
              </View>

              <Text style={[styles.title, { textAlign: 'center' }]}>
                Identificamos que você é menor de idade
              </Text>
              <Text style={[styles.subtitle, { textAlign: 'center' }]}>
                Está tudo bem. Para cuidar da sua segurança, precisamos da participação de um responsável antes de continuar.
              </Text>

              <View style={styles.minorCard}>
                <Ionicons name="people-outline" size={24} color="#F59E0B" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.minorCardTitle}>Acompanhamento de um responsável</Text>
                  <Text style={styles.minorCardSubtitle}>
                    Alguns recursos ficam limitados até que uma pessoa responsável confirme os dados e autorize o uso da conta.
                  </Text>
                </View>
              </View>

              <View style={styles.privacyCard}>
                <Ionicons name="shield-checkmark-outline" size={20} color="#38BDF8" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.privacyTitle}>Sua conta continua protegida</Text>
                  <Text style={styles.bulletText}>• Nenhuma configuração foi alterada sem autorização.</Text>
                  <Text style={styles.bulletText}>• A selfie será excluída após esta verificação.</Text>
                </View>
              </View>

              <TouchableOpacity 
                style={styles.primaryButton}
                activeOpacity={0.85}
                onPress={() => router.push('/guardian' as any)}
              >
                <Text style={styles.primaryButtonText}>Continuar com responsável</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => setStep('intro')}
              >
                <Text style={styles.backButtonText}>Voltar</Text>
              </TouchableOpacity>
            </View>
          ) : null}

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
    paddingBottom: 36,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 6,
  },
  circleButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBadge: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 16,
  },
  stepBadgeText: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '700',
  },
  helpText: {
    color: '#38BDF8',
    fontSize: 13,
    fontWeight: '600',
  },
  content: {
    gap: 14,
  },
  resultContent: {
    alignItems: 'center',
    gap: 16,
    paddingTop: 10,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tagText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 30,
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 19,
  },
  cameraFrame: {
    backgroundColor: '#0F172A',
    borderRadius: 20,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1E293B',
    position: 'relative',
    marginVertical: 4,
    overflow: 'hidden',
  },
  liveCamera: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  permissionBox: {
    alignItems: 'center',
    gap: 10,
  },
  permissionBtn: {
    backgroundColor: '#0055FF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  permissionBtnText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  statusPill: {
    position: 'absolute',
    top: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0,0,0,0.65)',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    zIndex: 10,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
  },
  blueDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#38BDF8',
  },
  statusPillText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  faceOvalGuide: {
    width: 140,
    height: 180,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: '#38BDF8',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 5,
  },
  laserLine: {
    position: 'absolute',
    top: '45%',
    width: '100%',
    height: 2,
    backgroundColor: '#38BDF8',
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 4,
  },
  cameraBottomPill: {
    position: 'absolute',
    bottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0,0,0,0.65)',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    zIndex: 10,
  },
  cameraBottomText: {
    color: '#FFFFFF',
    fontSize: 11,
  },
  instructionText: {
    color: '#CBD5E1',
    fontSize: 12,
    textAlign: 'center',
  },
  privacyCard: {
    backgroundColor: '#0A1230',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderColor: '#1E293B',
    width: '100%',
  },
  privacyTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 3,
  },
  privacySubtitle: {
    color: '#94A3B8',
    fontSize: 11,
    lineHeight: 16,
  },
  bulletText: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 2,
  },
  primaryButton: {
    backgroundColor: '#0055FF',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    shadowColor: '#0055FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  footerHelp: {
    color: '#64748B',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 2,
  },
  linkText: {
    color: '#38BDF8',
    fontWeight: '600',
  },
  progressContainer: {
    backgroundColor: '#0A1230',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1E293B',
    gap: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  progressPercentage: {
    color: '#38BDF8',
    fontSize: 13,
    fontWeight: '700',
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: '#1E293B',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#38BDF8',
    borderRadius: 3,
  },
  progressHelper: {
    color: '#64748B',
    fontSize: 11,
  },
  securityText: {
    color: '#64748B',
    fontSize: 11,
    textAlign: 'center',
  },
  successIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 85, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#0055FF',
    marginVertical: 10,
  },
  minorIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#F59E0B',
    marginVertical: 10,
  },
  infoCard: {
    backgroundColor: '#0A1230',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#1E293B',
    width: '100%',
  },
  infoIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 85, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCardTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  infoCardSubtitle: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 2,
  },
  minorCard: {
    backgroundColor: '#131B3A',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderColor: '#F59E0B',
    width: '100%',
  },
  minorCardTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  minorCardSubtitle: {
    color: '#94A3B8',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 3,
  },
  backButton: {
    paddingVertical: 8,
  },
  backButtonText: {
    color: '#94A3B8',
    fontSize: 13,
    textAlign: 'center',
  },
});