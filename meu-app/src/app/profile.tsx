import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView,
  Alert 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface TaskManageItem {
  id: string;
  category: string;
  title: string;
}

export default function ProfileScreen() {
  const router = useRouter();

  // Lista de tarefas gerenciáveis (com exclusão funcional!)
  const [tasks, setTasks] = useState<TaskManageItem[]>([
    { id: '1', category: 'ASTRONOMIA', title: 'Qual é o planeta mais quente do Sistema Solar?' },
    { id: '2', category: 'TECNOLOGIA', title: 'O que é API?' },
  ]);

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((item) => item.id !== id));
  };

  const handleLogout = () => {
    router.push('/auth-choice' as any);
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
          </View>

          {/* Barra de Título com Voltar */}
          <View style={styles.navRow}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.screenTitle}>Perfil e Ajustes</Text>
          </View>

          {/* Card Principal do Usuário */}
          <View style={styles.userCard}>
            <View style={styles.userInfoRow}>
              <View style={styles.avatarCircle}>
                <Image 
                  source={require('../../assets/images/byte.png')}
                  style={styles.avatarImage}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.userTextInfo}>
                <Text style={styles.userName}>Katty</Text>
                <Text style={styles.userEmail}>katty@focus.app</Text>
              </View>

              <View style={styles.activeBadge}>
                <Ionicons name="checkmark-circle" size={13} color="#38BDF8" />
                <Text style={styles.activeBadgeText}>Ativo</Text>
              </View>
            </View>

            {/* Botão de Editar Dados */}
            <TouchableOpacity 
              style={styles.editProfileButton}
              activeOpacity={0.85}
              onPress={() => router.push('/edit-profile' as any)}
            >
              <Text style={styles.editProfileButtonText}>Editar dados do perfil</Text>
              <Ionicons name="pencil" size={14} color="#FFFFFF" style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          </View>

          {/* Card do Mascote Ativo */}
          <View style={styles.companionCard}>
            <View style={styles.companionIconBox}>
              <Image 
                source={require('../../assets/images/byte.png')}
                style={styles.companionIconImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.companionTextBox}>
              <Text style={styles.companionTitle}>Byte está ativo</Text>
              <Text style={styles.companionSubtitle}>
                Seu companheiro de foco está te acompanhando nas tarefas.
              </Text>
            </View>
          </View>

          {/* Seção: Gerenciamento de Tarefas */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Gerenciamento de Tarefas</Text>
            
            <View style={styles.tasksContainer}>
              {tasks.map((task) => (
                <View key={task.id} style={styles.taskManageCard}>
                  <View style={styles.taskManageTextInfo}>
                    <Text style={styles.taskCategory}>{task.category}</Text>
                    <Text style={styles.taskTitle} numberOfLines={1}>
                      {task.title}
                    </Text>
                  </View>

                  <View style={styles.taskActions}>
                    <TouchableOpacity 
                      style={styles.actionBtnEdit}
                      onPress={() => alert(`Editar tarefa: ${task.title}`)}
                    >
                      <Ionicons name="pencil" size={15} color="#38BDF8" />
                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={styles.actionBtnDelete}
                      onPress={() => handleDeleteTask(task.id)}
                    >
                      <Ionicons name="trash-outline" size={15} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}

              {tasks.length === 0 && (
                <Text style={styles.emptyTasksText}>Nenhuma tarefa ativa no momento.</Text>
              )}
            </View>
          </View>

          {/* Seção: Ajustes do Aplicativo */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ajustes do Aplicativo</Text>

            <View style={styles.settingsList}>
              {/* Notificações */}
              <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
                <View style={[styles.settingIconBox, { backgroundColor: 'rgba(56, 189, 248, 0.15)' }]}>
                  <Ionicons name="notifications-outline" size={18} color="#38BDF8" />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Notificações</Text>
                  <Text style={styles.settingDesc}>Alertas de tempo de tela e lembretes</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#64748B" />
              </TouchableOpacity>

              {/* Privacidade e Segurança */}
              <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
                <View style={[styles.settingIconBox, { backgroundColor: 'rgba(56, 189, 248, 0.15)' }]}>
                  <Ionicons name="lock-closed-outline" size={18} color="#38BDF8" />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Privacidade e Segurança</Text>
                  <Text style={styles.settingDesc}>Senhas e dados de compartilhamento</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#64748B" />
              </TouchableOpacity>

              {/* Acessibilidade */}
              <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
                <View style={[styles.settingIconBox, { backgroundColor: 'rgba(56, 189, 248, 0.15)' }]}>
                  <Ionicons name="eye-outline" size={18} color="#38BDF8" />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Acessibilidade</Text>
                  <Text style={styles.settingDesc}>Contraste, fontes e áudio adaptados</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#64748B" />
              </TouchableOpacity>

              {/* Ajuda e Suporte */}
              <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
                <View style={[styles.settingIconBox, { backgroundColor: 'rgba(56, 189, 248, 0.15)' }]}>
                  <Ionicons name="help-circle-outline" size={18} color="#38BDF8" />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Ajuda e Suporte</Text>
                  <Text style={styles.settingDesc}>FAQ, contato e termos de uso</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#64748B" />
              </TouchableOpacity>

              {/* Sair da Conta (Logout) */}
              <TouchableOpacity 
                style={[styles.settingItem, styles.logoutItem]} 
                activeOpacity={0.7}
                onPress={handleLogout}
              >
                <View style={[styles.settingIconBox, { backgroundColor: 'rgba(239, 68, 68, 0.15)' }]}>
                  <Ionicons name="log-out-outline" size={18} color="#EF4444" />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={[styles.settingTitle, { color: '#EF4444' }]}>Sair da Conta</Text>
                  <Text style={styles.settingDesc}>Desconectar do dispositivo atual</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#EF4444" />
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
  userCard: {
    backgroundColor: '#0A1230',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
    gap: 14,
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#0284C7',
    borderWidth: 2,
    borderColor: '#38BDF8',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: 44,
    height: 44,
  },
  userTextInfo: {
    flex: 1,
    gap: 2,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  userEmail: {
    color: '#94A3B8',
    fontSize: 12,
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  activeBadgeText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '700',
  },
  editProfileButton: {
    backgroundColor: '#0055FF',
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editProfileButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  companionCard: {
    backgroundColor: '#0F172A',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  companionIconBox: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#0A1230',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  companionIconImage: {
    width: 38,
    height: 38,
  },
  companionTextBox: {
    flex: 1,
    gap: 2,
  },
  companionTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  companionSubtitle: {
    color: '#94A3B8',
    fontSize: 11,
    lineHeight: 15,
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  tasksContainer: {
    gap: 10,
  },
  taskManageCard: {
    backgroundColor: '#0A1230',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  taskManageTextInfo: {
    flex: 1,
    gap: 2,
    paddingRight: 10,
  },
  taskCategory: {
    color: '#38BDF8',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  taskTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  taskActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionBtnEdit: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnDelete: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTasksText: {
    color: '#64748B',
    fontSize: 12,
    fontStyle: 'italic',
  },
  settingsList: {
    gap: 10,
  },
  settingItem: {
    backgroundColor: '#0A1230',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  settingIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingInfo: {
    flex: 1,
    gap: 2,
  },
  settingTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  settingDesc: {
    color: '#94A3B8',
    fontSize: 11,
  },
  logoutItem: {
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
});