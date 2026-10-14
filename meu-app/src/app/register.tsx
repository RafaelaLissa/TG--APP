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

export default function RegisterScreen() {
  const router = useRouter();

  // Estados dos campos de cadastro
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [aceitouTermos, setAceitouTermos] = useState(false);

  const handleCadastro = () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }
    if (senha !== confirmarSenha) {
      alert('As senhas digitadas não são iguais!');
      return;
    }
    if (!aceitouTermos) {
      alert('Você precisa aceitar os Termos de Uso e Política de Privacidade.');
      return;
    }

    alert('Cadastro realizado com sucesso!');
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

              {/*<Text style={styles.stepTag}>02 / SEU PERFIL</Text>*/}
            </View>

            {/* Títulos */}
            <View style={styles.titleSection}>
              <Text style={styles.mainTitle}>Vamos conhecer você.</Text>
              <Text style={styles.subtitle}>
                Só alguns dados para começar sua jornada com o Byte.
              </Text>
            </View>

            {/* Badge do Companheiro */}
            <View style={styles.companionBadge}>
              <Text style={styles.companionText}>
                Seu companheiro: <Text style={styles.companionHighlight}>Byte • Gato robô</Text>
              </Text>
            </View>

            {/* Formulário com 5 campos */}
            <View style={styles.form}>
              
              {/* 1. Nome completo */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nome completo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Como você se chama?"
                  placeholderTextColor="#94A3B8"
                  value={nome}
                  onChangeText={setNome}
                />
              </View>

              {/* 2. E-mail */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>E-mail</Text>
                <TextInput
                  style={styles.input}
                  placeholder="voce@exemplo.com"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              {/* 3. Data de nascimento */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Data de nascimento</Text>
                <TextInput
                  style={styles.input}
                  placeholder="DD/MM/AAAA"
                  placeholderTextColor="#94A3B8"
                  keyboardType="numeric"
                  maxLength={10}
                  value={dataNasc}
                  onChangeText={setDataNasc}
                />
              </View>

              {/* 4. Crie uma senha */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Crie uma senha</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Digite sua senha"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry
                  value={senha}
                  onChangeText={setSenha}
                />
              </View>

              {/* 5. Confirmar senha */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirmar senha</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Digite sua senha"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry
                  value={confirmarSenha}
                  onChangeText={setConfirmarSenha}
                />
              </View>

              {/* Checkbox de Termos de Uso */}
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

              {/* Botão de Cadastrar */}
              <TouchableOpacity 
                style={[
                  styles.registerButton, 
                  !aceitouTermos && styles.registerButtonDisabled
                ]}
                activeOpacity={0.85}
                onPress={handleCadastro}
              >
                <Text style={styles.registerButtonText}>Cadastrar</Text>
              </TouchableOpacity>

              {/* Aviso dos termos */}
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

            </View>

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
    marginBottom: 24,
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
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 14,
    lineHeight: 20,
  },
  companionBadge: {
    backgroundColor: '#E2E8F0',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 20,
    alignSelf: 'flex-start',
    width: '100%',
  },
  companionText: {
    color: '#1E40AF',
    fontSize: 13,
    fontWeight: '500',
  },
  companionHighlight: {
    fontWeight: '700',
  },
  form: {
    gap: 16,
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 6,
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
  registerButton: {
    backgroundColor: '#0055FF',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: '#0055FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  registerButtonDisabled: {
    backgroundColor: '#1E3A8A', // Mais escuro quando desativado, igual ao Figma!
    shadowOpacity: 0,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  termsWarningText: {
    color: '#64748B',
    fontSize: 12,
    textAlign: 'center',
    marginTop: -6,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 4,
    paddingVertical: 8,
  },
  backButtonText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '500',
  },
});