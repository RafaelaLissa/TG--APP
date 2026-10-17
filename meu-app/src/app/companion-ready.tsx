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
import { useRouter, useLocalSearchParams } from 'expo-router';

// Imagens dinâmicas de cada mascote
const COMPANION_IMAGES: Record<string, any> = {
  byte: require('../../assets/images/byte.png'),
  lumi: require('../../assets/images/lumi.png'),
  pip: require('../../assets/images/pip.png'),
};

export default function CompanionReadyScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ companionId?: string }>();

  const companionId = params.companionId || 'byte';
  
  // Título personalizado por mascote
  const companionDisplayName = 
    companionId === 'lumi' 
      ? 'a Lumi' 
      : companionId === 'pip' 
      ? 'o Pip' 
      : 'o Byte';

  // Imagem do mascote escolhido
  const mascotSource = COMPANION_IMAGES[companionId] || COMPANION_IMAGES.byte;

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
            <View style={styles.brandRow}>
              <View style={styles.logoBadge}>
                <Text style={styles.logoLetter}>F.</Text>
              </View>
              <Text style={styles.brandTitle}>Focus</Text>
            </View>

            {/*<Text style={styles.stepTag}>CADASTRO CONCLUÍDO</Text>*/}
          </View>

          {/* Títulos de Celebração */}
          <View style={styles.titleSection}>
            <Text style={styles.mainTitle}>
              Você e {companionDisplayName}.{'\n'}Um passo de cada vez.
            </Text>
            <Text style={styles.subtitle}>
              Seu companheiro está pronto para descobrir uma rotina com mais equilíbrio.
            </Text>
          </View>

          {/* Mascote Dinâmico com Tag */}
          <View style={styles.mascotContainer}>
            <View style={styles.profileCreatedPill}>
              <Text style={styles.profileCreatedText}>✓ PERFIL CRIADO</Text>
            </View>

            <Image 
              source={mascotSource}
              style={styles.mascotImage}
              resizeMode="contain"
            />
          </View>

          {/* Card de Hábitos e Consciência */}
          <View style={styles.habitsCard}>
            <Text style={styles.habitsTitle}>
              Pequenos hábitos. Mais consciência.
            </Text>
            <Text style={styles.habitsSubtitle}>
              Acompanhe suas atividades, perceba como você se sente e conheça os padrões da sua rotina.
            </Text>

            <View style={styles.tagsRow}>
              <Text style={styles.tagItem}>Movimento</Text>
              <Text style={styles.tagDot}>•</Text>
              <Text style={styles.tagItem}>Descanso</Text>
              <Text style={styles.tagDot}>•</Text>
              <Text style={styles.tagItem}>Emoções</Text>
            </View>
          </View>

          {/* Botão de Início */}
          <TouchableOpacity 
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={() => alert('Entrando no painel principal do Focus!')}
          >
            <Text style={styles.primaryButtonText}>Começar</Text>
          </TouchableOpacity>

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
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
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
  stepTag: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  titleSection: {
    marginBottom: 16,
    gap: 8,
  },
  mainTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 32,
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 18,
  },
  mascotContainer: {
    alignItems: 'center',
    marginVertical: 12,
  },
  profileCreatedPill: {
    marginBottom: 12,
  },
  profileCreatedText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  mascotImage: {
    width: 190,
    height: 190,
  },
  habitsCard: {
    gap: 8,
    marginBottom: 24,
  },
  habitsTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  habitsSubtitle: {
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 18,
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  tagItem: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '600',
  },
  tagDot: {
    color: '#64748B',
    fontSize: 12,
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
});