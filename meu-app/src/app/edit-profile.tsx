import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  Platform 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function EditProfileScreen() {
  const router = useRouter();

  // Estados dos dados do perfil (com os valores do seu Figma)
  const [nome, setNome] = useState('Katty');
  const [username, setUsername] = useState('katty.focus');
  const [email, setEmail] = useState('katty@focus.app');
  const [dataNasc, setDataNasc] = useState('12/04/2012');

  // Foto de perfil selecionada (começa com o Byte como padrão)
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  // Modal para escolher entre Câmera e Galeria
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  // 1. Tirar foto agora com a Câmera
  const pickFromCamera = async () => {
    setShowPhotoModal(false);
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert('Precisamos de permissão para usar a câmera!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0].uri) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  // 2. Escolher foto da Galeria
  const pickFromGallery = async () => {
    setShowPhotoModal(false);
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert('Precisamos de permissão para acessar suas fotos!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0].uri) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    alert('Alterações salvas com sucesso!');
    router.back();
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

            {/* Topo / Header com Logo */}
            <View style={styles.header}>
              <View style={styles.brandRow}>
                <View style={styles.logoBadge}>
                  <Text style={styles.logoLetter}>F.</Text>
                </View>
                <Text style={styles.brandTitle}>Focus</Text>
              </View>
            </View>

            {/* Título com Voltar */}
            <View style={styles.navRow}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.screenTitle}>Editar Perfil</Text>
            </View>

            {/* Card com Foto e Badge do Companheiro */}
            <View style={styles.avatarCard}>
              <View style={styles.avatarWrapper}>
                <TouchableOpacity 
                  style={styles.avatarCircle}
                  activeOpacity={0.8}
                  onPress={() => setShowPhotoModal(true)}
                >
                  <Image 
                    source={
                      avatarUri 
                        ? { uri: avatarUri } 
                        : require('../../assets/images/byte.png')
                    }
                    style={styles.avatarImage}
                    resizeMode="cover"
                  />
                  {/* Ícone de câmera no cantinho do avatar */}
                  <View style={styles.cameraBadge}>
                    <Ionicons name="camera" size={13} color="#FFFFFF" />
                  </View>
                </TouchableOpacity>

                <View style={styles.companionTag}>
                  <Text style={styles.companionTagText}>
                    Byte Ativo • Companheiro
                  </Text>
                </View>
              </View>
            </View>

            {/* Formulário de Edição */}
            <View style={styles.form}>
              
              {/* Nome */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nome</Text>
                <TextInput
                  style={styles.input}
                  value={nome}
                  onChangeText={setNome}
                  placeholder="Seu nome"
                  placeholderTextColor="#94A3B8"
                />
              </View>

              {/* Nome de usuário */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nome de usuário</Text>
                <TextInput
                  style={styles.input}
                  value={username}
                  onChangeText={setUsername}
                  placeholder="usuario.focus"
                  placeholderTextColor="#94A3B8"
                  autoCapitalize="none"
                />
              </View>

              {/* E-mail */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>E-mail</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="voce@exemplo.com"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Data de nascimento */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Data de nascimento</Text>
                <TextInput
                  style={styles.input}
                  value={dataNasc}
                  onChangeText={setDataNasc}
                  placeholder="DD/MM/AAAA"
                  placeholderTextColor="#94A3B8"
                  keyboardType="numeric"
                />
              </View>

              {/* Item: Senha e Segurança */}
              <TouchableOpacity style={styles.securityCard} activeOpacity={0.8}>
                <View style={styles.securityIconBox}>
                  <Ionicons name="lock-closed-outline" size={18} color="#38BDF8" />
                </View>
                <View style={styles.securityInfo}>
                  <Text style={styles.securityTitle}>Senha e Segurança</Text>
                  <Text style={styles.securityDesc}>Alterar senha e gerenciar PIN de segurança</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#64748B" />
              </TouchableOpacity>

              {/* Botões de Ação */}
              <TouchableOpacity 
                style={styles.saveButton}
                activeOpacity={0.85}
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>Salvar alterações</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => router.back()}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {/* Modal para Escolher Foto (Câmera ou Galeria) */}
      <Modal
        visible={showPhotoModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowPhotoModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowPhotoModal(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Alterar foto de perfil</Text>
            
            <TouchableOpacity 
              style={styles.modalOption}
              onPress={pickFromCamera}
            >
              <Ionicons name="camera-outline" size={20} color="#38BDF8" />
              <Text style={styles.modalOptionText}>Tirar foto agora (Câmera)</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.modalOption}
              onPress={pickFromGallery}
            >
              <Ionicons name="images-outline" size={20} color="#38BDF8" />
              <Text style={styles.modalOptionText}>Escolher da Galeria</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.modalOption, styles.modalOptionCancel]}
              onPress={() => setShowPhotoModal(false)}
            >
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
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
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 40,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#0055FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoLetter: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '700',
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },
  avatarCard: {
    backgroundColor: '#0A1230',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
    alignItems: 'center',
  },
  avatarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    width: '100%',
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#0284C7',
    borderWidth: 2,
    borderColor: '#38BDF8',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'visible',
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#0055FF',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#0A1230',
  },
  companionTag: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 16,
    flex: 1,
  },
  companionTagText: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '700',
  },
  form: {
    gap: 14,
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
  securityCard: {
    backgroundColor: '#0A1230',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#1E293B',
    marginTop: 4,
  },
  securityIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  securityInfo: {
    flex: 1,
    gap: 2,
  },
  securityTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  securityDesc: {
    color: '#94A3B8',
    fontSize: 11,
  },
  saveButton: {
    backgroundColor: '#0055FF',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#0055FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  cancelButton: {
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalContent: {
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    gap: 12,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#1E293B',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  modalOptionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  modalOptionCancel: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    marginTop: 4,
  },
  modalCancelText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '700',
  },
});