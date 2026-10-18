import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView,
  Animated,
  Modal
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type MoodType = 'saudavel' | 'leve' | 'moderado' | 'critico';
type CompanionId = 'byte' | 'lumi' | 'pip';

const COMPANION_MOOD_IMAGES: Record<CompanionId, Record<MoodType, any>> = {
  byte: {
    saudavel: require('../../assets/images/byte.png'),
    leve: require('../../assets/images/byte_leve.png'),
    moderado: require('../../assets/images/byte_moderado.png'),
    critico: require('../../assets/images/byte_critico.png'),
  },
  lumi: {
    saudavel: require('../../assets/images/lumi.png'),
    leve: require('../../assets/images/lumi_leve.png'),
    moderado: require('../../assets/images/lumi_moderado.png'),
    critico: require('../../assets/images/lumi_critico.png'),
  },
  pip: {
    saudavel: require('../../assets/images/pip.png'),
    leve: require('../../assets/images/pip_leve.png'),
    moderado: require('../../assets/images/pip_moderado.png'),
    critico: require('../../assets/images/pip_critico.png'),
  },
};

interface TaskItem {
  id: string;
  category: string;
  question: string;
  desc: string;
  icon: keyof typeof Ionicons.glyphMap;
  options: string[];
  correct: number;
}

const DAILY_TASKS: TaskItem[] = [
  {
    id: '1',
    category: 'ASTRONOMIA',
    question: 'Qual é o planeta mais quente do Sistema Solar?',
    desc: 'Escolha uma resposta para testar seu conhecimento.',
    icon: 'help-circle-outline',
    options: ['Mercúrio', 'Vênus', 'Marte', 'Júpiter'],
    correct: 1, // Vênus
  },
  {
    id: '2',
    category: 'HISTÓRIA',
    question: 'Qual foi o primeiro navegador a chegar ao Brasil?',
    desc: 'Uma pergunta de história para testar sua memória.',
    icon: 'pulse-outline',
    options: ['Pedro Álvares Cabral', 'Vasco da Gama', 'Cristóvão Colombo'],
    correct: 0,
  },
  {
    id: '3',
    category: 'CIÊNCIA',
    question: 'Qual é o elemento químico mais leve da tabela periódica?',
    desc: 'Uma pergunta de ciência para testar seu raciocínio.',
    icon: 'moon-outline',
    options: ['Hélio', 'Oxigênio', 'Hidrogênio', 'Lítio'],
    correct: 2,
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ companionId?: CompanionId }>();
  const companionId: CompanionId = (params.companionId as CompanionId) || 'byte';

  // ========================================================
  // MOTOR DE TEMPO DE TELA AUTOMÁTICO (Minutos de uso no dia)
  // Inicia em 134 minutos (2h 14m, igual ao seu Figma)
  // ========================================================
  const [screenTimeMinutes, setScreenTimeMinutes] = useState(134);
  const goalMinutes = 150; // Meta diária de 2h 30m (150 min)

  // O relógio avança o tempo automaticamente sozinho enquanto o app está aberto
  useEffect(() => {
    const timer = setInterval(() => {
      setScreenTimeMinutes((prev) => prev + 1);
    }, 60000); // Adiciona 1 minuto a cada 60 segundos reais

    return () => clearInterval(timer);
  }, []);

  // ========================================================
  // CÁLCULO AUTOMÁTICO DO ESTADO DO MASCOTE PELO TEMPO
  // ========================================================
  const getAutoMood = (minutes: number): MoodType => {
    if (minutes < 90) return 'saudavel';   // Menos de 1h30: Saudável
    if (minutes < 150) return 'leve';      // 1h30 a 2h30: Levemente cansado
    if (minutes < 210) return 'moderado';  // 2h30 a 3h30: Moderado
    return 'critico';                      // Mais de 3h30: Crítico (deitado)
  };

  const mood = getAutoMood(screenTimeMinutes);

  // Formatação do tempo em horas e minutos
  const currentHours = Math.floor(screenTimeMinutes / 60);
  const currentMins = screenTimeMinutes % 60;
  const timeFormatted = `${currentHours}h ${currentMins < 10 ? '0' : ''}${currentMins}m`;

  // Cálculo da porcentagem da meta
  const percentage = Math.min(100, Math.round((screenTimeMinutes / goalMinutes) * 100));

  // Informações de texto e cor do crachá de energia
  const getMoodBadge = () => {
    if (mood === 'saudavel') return { text: '🟢 Saudável • 100% energia', color: '#22C55E' };
    if (mood === 'leve') return { text: '🟡 Levemente cansado • 75% energia', color: '#EAB308' };
    if (mood === 'moderado') return { text: '🟠 Cansaço moderado • 45% energia', color: '#F97316' };
    return { text: '🔴 Estado crítico • Exausto no chão!', color: '#EF4444' };
  };

  const moodInfo = getMoodBadge();

  // Imagem automática do mascote conforme o estado calculado
  const companionImages = COMPANION_MOOD_IMAGES[companionId] || COMPANION_MOOD_IMAGES.byte;
  const currentImage = companionImages[mood] || companionImages.saudavel;

  // Animação de respiração do mascote
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (mood === 'critico') {
      floatAnim.setValue(0);
      return;
    }

    const duration = mood === 'saudavel' ? 1600 : mood === 'leve' ? 2000 : 2600;
    const distance = mood === 'saudavel' ? -10 : mood === 'leve' ? -6 : -3;

    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: distance,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: duration,
          useNativeDriver: true,
        }),
      ])
    );

    anim.start();
    return () => anim.stop();
  }, [mood]);

  // Funções de simulação rápida para apresentação na banca
  const addThirtyMinutes = () => setScreenTimeMinutes((prev) => prev + 30);
  const resetScreenTime = () => setScreenTimeMinutes(45); // Volta para 45 minutos (saudável)

  // Modal das tarefas
  const [activeTask, setActiveTask] = useState<TaskItem | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleAnswer = (index: number) => {
    setSelectedOption(index);
    if (activeTask) {
      if (index === activeTask.correct) {
        alert('🎉 Resposta Correta! Você ganhou +50 pontos de foco e seu companheiro ficou feliz!');
      } else {
        alert('Ops! Resposta incorreta, mas valeu a tentativa!');
      }
      setTimeout(() => {
        setActiveTask(null);
        setSelectedOption(null);
      }, 500);
    }
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

          {/* Topo / Header com Logo e Botão "Você" */}
          <View style={styles.header}>
            <View style={styles.brandRow}>
              <View style={styles.logoBadge}>
                <Text style={styles.logoLetter}>F.</Text>
              </View>
              <Text style={styles.brandTitle}>Focus</Text>
            </View>

            {/* Botão Perfil "Você" */}
            <TouchableOpacity 
              style={styles.profileButton}
              activeOpacity={0.8}
              onPress={() => router.push('/profile' as any)}
            >
              <View style={styles.profileAvatarMini}>
                <Ionicons name="person" size={13} color="#FFFFFF" />
              </View>
              <Text style={styles.profileButtonText}>Você</Text>
            </TouchableOpacity>
          </View>

          {/* Área do Mascote Dinâmico */}
          <View style={styles.mascotSection}>
            <View style={styles.profileCreatedPill}>
              <Text style={styles.profileCreatedText}>✓ PERFIL CRIADO</Text>
            </View>

            {/* Imagem do Mascote que muda de estado automaticamente */}
            <Animated.View 
              style={[
                styles.mascotWrapper,
                { transform: [{ translateY: floatAnim }] },
                mood === 'critico' && styles.mascotCritical
              ]}
            >
              <Image 
                source={currentImage}
                style={styles.mascotImage}
                resizeMode="contain"
              />
            </Animated.View>

            {/* Badge com o estado de energia atual */}
            <View style={styles.moodPill}>
              <Text style={[styles.moodPillText, { color: moodInfo.color }]}>
                {moodInfo.text}
              </Text>
            </View>
          </View>

          {/* Card de Tempo de Tela Real */}
          <View style={styles.timeCard}>
            <View style={styles.timeCardHeader}>
              <View style={styles.timeTitleRow}>
                <Ionicons name="time-outline" size={18} color="#38BDF8" />
                <Text style={styles.timeTitle}>Tempo de tela</Text>
              </View>

              <View style={styles.todayBadge}>
                <Ionicons name="shield-checkmark" size={13} color="#38BDF8" />
                <Text style={styles.todayBadgeText}>Hoje</Text>
              </View>
            </View>

            {/* Estatísticas (Total dinâmico, Média, Meta) */}
            <View style={styles.statsRow}>
              <View style={styles.statCol}>
                <Text style={styles.statLabel}>Total</Text>
                <Text style={styles.statValue}>{timeFormatted}</Text>
              </View>

              <View style={styles.statCol}>
                <Text style={styles.statLabel}>Média</Text>
                <Text style={styles.statValue}>1h 32m</Text>
              </View>

              <View style={styles.statCol}>
                <Text style={styles.statLabel}>Meta</Text>
                <Text style={[styles.statValue, { color: '#38BDF8' }]}>2h 30m</Text>
              </View>
            </View>

            {/* Barra de Progresso em Tempo Real */}
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${percentage}%` }]} />
            </View>

            <View style={styles.progressFooter}>
              <Text style={styles.progressNote}>
                Você já alcançou {percentage}% da meta de hoje.
              </Text>

              {/* Botões de Simulação Rápida para Demonstração da Banca */}
              <View style={styles.simButtonsRow}>
                <TouchableOpacity 
                  style={styles.simButton}
                  onPress={addThirtyMinutes}
                >
                  <Text style={styles.simButtonText}>+30 min</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.simButtonReset}
                  onPress={resetScreenTime}
                >
                  <Text style={styles.simButtonResetText}>Zerar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Seção de Tarefas / Perguntas do Dia */}
          <View style={styles.tasksSection}>
            <View style={styles.tasksSectionHeader}>
              <Text style={styles.tasksSectionTitle}>Tarefa</Text>
              <TouchableOpacity>
                <Text style={styles.tasksSectionAction}>Abrir</Text>
              </TouchableOpacity>
            </View>

            {/* Lista das 3 Tarefas */}
            <View style={styles.tasksList}>
              {DAILY_TASKS.map((task) => (
                <TouchableOpacity
                  key={task.id}
                  style={styles.taskCard}
                  activeOpacity={0.8}
                  onPress={() => setActiveTask(task)}
                >
                  <View style={styles.taskIconBox}>
                    <Ionicons name={task.icon} size={20} color="#38BDF8" />
                  </View>

                  <View style={styles.taskInfo}>
                    <Text style={styles.taskQuestion}>{task.question}</Text>
                    <Text style={styles.taskDesc}>{task.desc}</Text>
                  </View>

                  <Ionicons name="chevron-forward" size={18} color="#64748B" />
                </TouchableOpacity>
              ))}
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>

      {/* Modal Interativo para Responder à Pergunta */}
      <Modal
        visible={!!activeTask}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setActiveTask(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalCategory}>{activeTask?.category}</Text>
              <TouchableOpacity onPress={() => setActiveTask(null)}>
                <Ionicons name="close" size={24} color="#FFF" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalQuestion}>{activeTask?.question}</Text>

            <View style={styles.modalOptions}>
              {activeTask?.options.map((option, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.modalOptionButton,
                    selectedOption === idx && styles.modalOptionSelected
                  ]}
                  onPress={() => handleAnswer(idx)}
                >
                  <Text style={styles.modalOptionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>

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
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 36,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 6,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBadge: {
    width: 34,
    height: 34,
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
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
  },
  profileAvatarMini: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#0055FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  mascotSection: {
    alignItems: 'center',
    marginVertical: 10,
  },
  profileCreatedPill: {
    marginBottom: 8,
  },
  profileCreatedText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  mascotWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 180,
  },
  mascotCritical: {
    marginTop: 10,
  },
  mascotImage: {
    width: 180,
    height: 180,
  },
  moodPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
    marginTop: 10,
  },
  moodPillText: {
    fontSize: 11,
    fontWeight: '700',
  },
  timeCard: {
    backgroundColor: '#0A1230',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
    marginVertical: 14,
    gap: 12,
  },
  timeCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  todayBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  todayBadgeText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  statCol: {
    gap: 2,
  },
  statLabel: {
    color: '#94A3B8',
    fontSize: 12,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#1E293B',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#38BDF8',
    borderRadius: 3,
  },
  progressFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  progressNote: {
    color: '#64748B',
    fontSize: 11,
    flex: 1,
  },
  simButtonsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  simButton: {
    backgroundColor: '#1E293B',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#38BDF8',
  },
  simButtonText: {
    color: '#38BDF8',
    fontSize: 10,
    fontWeight: '700',
  },
  simButtonReset: {
    backgroundColor: '#1E293B',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  simButtonResetText: {
    color: '#94A3B8',
    fontSize: 10,
  },
  tasksSection: {
    marginTop: 6,
    gap: 12,
  },
  tasksSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tasksSectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  tasksSectionAction: {
    color: '#38BDF8',
    fontSize: 13,
    fontWeight: '600',
  },
  tasksList: {
    gap: 10,
  },
  taskCard: {
    backgroundColor: '#0A1230',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  taskIconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskInfo: {
    flex: 1,
    gap: 3,
  },
  taskQuestion: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
  },
  taskDesc: {
    color: '#94A3B8',
    fontSize: 11,
    lineHeight: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#0F172A',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    gap: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalCategory: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  modalQuestion: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
  },
  modalOptions: {
    gap: 10,
    marginTop: 8,
    marginBottom: 16,
  },
  modalOptionButton: {
    backgroundColor: '#1E293B',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
  modalOptionSelected: {
    backgroundColor: '#0055FF',
    borderColor: '#0055FF',
  },
  modalOptionText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});