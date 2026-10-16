import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function GuardianScreen() {
  const router = useRouter();

  // Estados dos campos do responsável
  const [nomeResponsavel, setNomeResponsavel] = useState('');
  const [dataNascResponsavel, setDataNascResponsavel] = useState('');
  const [emailResponsavel, setEmailResponsavel] = useState('');
  const [aceitouTermos, setAceitouTermos] = useState(false);

  const handleCadastrarResponsavel = () => {
    if (!nomeResponsavel || !dataNascResponsavel || !emailResponsavel) {
      alert('Por favor, preencha todos os campos do responsável!');
      return;
    }
    if (!aceitouTermos) {
      alert('É necessário aceitar os Termos de Uso e Política de Privacidade.');
      return;
    }

    // Alerta simulando o envio de e-mail que você escolheu!
    alert(
      `E-mail de autorização enviado para ${emailResponsavel}!\n\nAssim que o responsável confirmar no e-mail, o seu acesso ao Focus será ativado.`
    );
  };

  return (
    <LinearGradient
      colors={['#0B1020', '#09133D', '#03071E']}
      locations={[0.1, 0.6, 1]}
      style={styles.container}
    >
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardContainer}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            
            {/* Topo / Header com Logo e Tag */}
            <View style={styles.header}>
              <View style={styles.brandRow}>
                <View style={styles.logoBadge}>
                  <Text style={styles.logoLetter}>F.</Text>
                </View>
                <Text style={styles.brandTitle}>Focus</Text>
              </View>

              <Text style={styles.stepTag}>03 / RESPONSÁVEL</Text>
            </View>

            {/* Títulos */}
            <View style={styles.titleSection}>
              <Text style={styles.mainTitle}>Cuidar é melhor com apoio.</Text>
              <Text style={styles.subtitle}>
                Como você tem menos de 18 anos, precisamos dos dados de um responsável.
              </Text>
            </View>

            {/* Badge de Apoio */}
            <View style={styles.supportBadge}>
              <Text style={styles.supportText}>
                Uma pessoa de confiança para apoiar você.
              </Text>
            </View>

            {/* Formulário do Responsável */}
            <View style={styles.formCard}>
              
              {/* 1. Nome do Responsável */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nome completo do responsável</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nome e sobrenome"
                  placeholderTextColor="#94A3B8"
                  value={nomeResponsavel}
                  onChangeText={setNomeResponsavel}
                />
              </View>

              {/* 2. Data de Nascimento do Responsável */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Data de nascimento do responsável</Text>
                <TextInput
                  style={styles.input}
                  placeholder="DD/MM/AAAA"
                  placeholderTextColor="#94A3B8"
                  keyboardType="numeric"
                  maxLength={10}
                  value={dataNascResponsavel}
                  onChangeText={setDataNascResponsavel}
                />
              </View>

              {/* 3. E-mail do Responsável */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>E-mail do responsável</Text>
                <TextInput
                  style={styles.input}
                  placeholder="responsavel@exemplo.com"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={emailResponsavel}
                  onChangeText={setEmailResponsavel}
                />
              </View>

            </View>

            {/* Mensagem de Instrução */}
            <Text style={styles.instructionText}>
              Peça ao seu responsável para preencher estes dados com você.
            </Text>

            {/* Checkbox de Termos */}
            <TouchableOpacity 
              style={styles.checkboxContainer}
              activeOpacity={0.8}
              onPress={() => setAceitouTermos(!aceitouTermos)}
            >
              <View style={[styles.checkbox, aceitouTermos && styles.checkboxChecked]}>
                {aceitouTermos && (
                  <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.checkboxLabel}>
                Li e aceito os Termos de Uso e a Política de Privacidade.
              </Text>
            </TouchableOpacity>

            {/* Botão de Ação */}
            <TouchableOpacity 
              style={[
                styles.primaryButton, 
                !aceitouTermos && styles.primaryButtonDisabled
              ]}
              activeOpacity={0.85}
              onPress={handleCadastrarResponsavel}
            >
              <Text style={styles.primaryButtonText}>Cadastrar responsável</Text>
            </TouchableOpacity>

            {!aceitouTermos && (
              <Text style={styles.termsWarningText}>
                Aceite os termos para continuar.
              </Text>
            )}

            {/* Botão de Voltar */}
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={16} color="#94A3B8" />
              <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>

          </ScrollView>
        </KeyboardAvoidingView>
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
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 28,
    paddingTop: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 8,
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
    gap: 6,
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
    lineHeight: 19,
  },
  supportBadge: {
    backgroundColor: '#E0EAFF',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 18,
    width: '100%',
  },
  supportText: {
    color: '#1E40AF',
    fontSize: 13,
    fontWeight: '600',
  },
  formCard: {
    borderWidth: 1.5,
    borderColor: '#0284C7',
    borderRadius: 16,
    padding: 16,
    gap: 14,
    backgroundColor: 'rgba(2, 132, 199, 0.05)',
    marginBottom: 14,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    color: '#F1F5F9',
    fontSize: 13,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#0F172A',
  },
  instructionText: {
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#64748B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#0055FF',
    borderColor: '#0055FF',
  },
  checkboxLabel: {
    color: '#CBD5E1',
    fontSize: 12,
    flex: 1,
    lineHeight: 18,
  },
  primaryButton: {
    backgroundColor: '#0055FF',
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
  primaryButtonDisabled: {
    backgroundColor: '#1E3A8A',
    shadowOpacity: 0,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  termsWarningText: {
    color: '#64748B',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 14,
    paddingVertical: 8,
  },
  backButtonText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '500',
  },
});