import React, { useState } from 'react';
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

type CompanionId = 'byte' | 'lumi' | 'pip';

interface CompanionData {
  id: CompanionId;
  name: string;
  species: string;
  desc: string;
  image: any;
}

const COMPANIONS: Record<CompanionId, CompanionData> = {
  byte: {
    id: 'byte',
    name: 'Byte',
    species: 'gato',
    desc: 'Seu gato robô curioso e carinhoso.',
    image: require('../../assets/images/byte.png'),
  },
  lumi: {
    id: 'lumi',
    name: 'Lumi',
    species: 'coruja',
    desc: 'Sua coruja robô sábia e atenta.',
    image: require('../../assets/images/lumi.png'), // 👈 mudamos de byte para lumi.png
  },
  pip: {
    id: 'pip',
    name: 'Pip',
    species: 'coelho',
    desc: 'Seu coelho robô ágil e cheio de energia.',
    image: require('../../assets/images/pip.png'), // 👈 mudamos de byte para pip.png
  },
};

export default function ChooseCompanionScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<CompanionId>('byte');

  const current = COMPANIONS[selected];
  // Pega os outros 2 companheiros para colocar nos botões de baixo
  const others = (Object.keys(COMPANIONS) as CompanionId[]).filter((id) => id !== selected);

  const handleContinue = () => {
    router.push({
      pathname: '/companion-ready',
      params: { companionId: selected },
    });
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
            <View style={styles.brandRow}>
              <View style={styles.logoBadge}>
                <Text style={styles.logoLetter}>F.</Text>
              </View>
              <Text style={styles.brandTitle}>Focus</Text>
            </View>

            {/*<Text style={styles.stepTag}>01 / COMPANHEIRO</Text>*/}
          </View>

          {/* Títulos */}
          <View style={styles.titleSection}>
            <Text style={styles.mainTitle}>
              Seu novo amigo vai ajudar a ter uma rotina melhor.
            </Text>
            <Text style={styles.subtitle}>
              Escolha quem vai acompanhar seus hábitos e seu bem-estar.
            </Text>
          </View>

          {/* Card Gigante do Companheiro Selecionado */}
          <View style={styles.featuredCard}>
            <View style={styles.selectedPill}>
              <Text style={styles.selectedPillText}>✓ COMPANHEIRO SELECIONADO</Text>
            </View>

            <Image 
              source={current.image}
              style={styles.featuredImage}
              resizeMode="contain"
            />

            <Text style={styles.companionName}>{current.name}</Text>
            <Text style={styles.companionDesc}>{current.desc}</Text>
          </View>

          {/* Seletor com os outros 2 Companheiros */}
          <View style={styles.optionsRow}>
            {others.map((id) => {
              const comp = COMPANIONS[id];
              return (
                <TouchableOpacity
                  key={id}
                  style={styles.optionCard}
                  activeOpacity={0.8}
                  onPress={() => setSelected(id)}
                >
                  <Image 
                    source={comp.image} 
                    style={styles.optionImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.optionLabel}>
                    {comp.name} • {comp.species}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Botão de Confirmação Dinâmico */}
          <TouchableOpacity 
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={handleContinue}
          >
            <Text style={styles.primaryButtonText}>
              Continuar com {current.name}
            </Text>
          </TouchableOpacity>

          <Text style={styles.footerNote}>
            Você pode trocar de companheiro depois.
          </Text>

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
    marginBottom: 20,
    gap: 8,
  },
  mainTitle: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: '800',
    lineHeight: 29,
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 18,
  },
  featuredCard: {
    backgroundColor: 'rgba(219, 234, 254, 0.95)', // Card claro com borda arredondada igual ao Figma
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  selectedPill: {
    marginBottom: 12,
  },
  selectedPillText: {
    color: '#0055FF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  featuredImage: {
    width: 170,
    height: 170,
    marginVertical: 4,
  },
  companionName: {
    color: '#0F172A',
    fontSize: 26,
    fontWeight: '800',
    marginTop: 6,
  },
  companionDesc: {
    color: '#475569',
    fontSize: 13,
    marginTop: 4,
    textAlign: 'center',
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 20,
  },
  optionCard: {
    flex: 1,
    backgroundColor: 'rgba(219, 234, 254, 0.85)',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
    gap: 8,
  },
  optionImage: {
    width: 70,
    height: 70,
  },
  optionLabel: {
    color: '#0F172A',
    fontSize: 12,
    fontWeight: '700',
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
  footerNote: {
    color: '#64748B',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
});