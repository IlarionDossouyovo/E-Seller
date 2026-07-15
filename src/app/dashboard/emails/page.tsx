'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Send, 
  Users, 
  TrendingUp, 
  Plus, 
  Search,
  Filter,
  Trash2,
  Edit,
  Copy,
  Eye,
  Clock,
  Zap,
  BarChart3,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { useI18n } from '@/app/i18n'

type CampaignStatus = 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed'

interface Campaign {
  id: number
  name: string
  subject: string
  status: CampaignStatus
  sent: number
  opened: number
  clicked: number
  date: string
  type: 'newsletter' | 'promotion' | 'automation' | 'welcome'
}

const mockCampaigns: Campaign[] = [
  {
    id: 1,
    name: 'Annonce Soldes Printemps',
    subject: '🌸 Jusqu\'a 50% de reduction - Soldes!',
    status: 'sent',
    sent: 12500,
    opened: 5625,
    clicked: 1875,
    date: '2024-04-05',
    type: 'promotion',
  },
  {
    id: 2,
    name: 'Lancement Nouveau Produit',
    subject: 'Decouvrez: Smart Watch Ultra',
    status: 'sent',
    sent: 15000,
    opened: 7500,
    clicked: 3000,
    date: '2024-04-01',
    type: 'newsletter',
  },
  {
    id: 3,
    name: 'Serie Bienvenue - Jour 1',
    subject: 'Bienvenue chez E-Seller! Voici ce qui vous attend...',
    status: 'sending',
    sent: 450,
    opened: 180,
    clicked: 90,
    date: '2024-04-09',
    type: 'automation',
  },
  {
    id: 4,
    name: 'Rappel Panier Abandonne',
    subject: 'Vous avez oublie quelque chose...',
    status: 'scheduled',
    sent: 0,
    opened: 0,
    clicked: 0,
    date: '2024-04-10',
    type: 'automation',
  },
  {
    id: 5,
    name: 'Newsletter Avril',
    subject: 'Les nouvelles E-Seller - Avril 2024',
    status: 'draft',
    sent: 0,
    opened: 0,
    clicked: 0,
    date: '',
    type: 'newsletter',
  },
]

const mockTemplates = [
  { name: 'Email de Bienvenue', category: 'Automatisation' },
  { name: 'Annonce Promotion', category: 'Promotion' },
  { name: 'Newsletter', category: 'Newsletter' },
  { name: 'Re-engagement', category: 'Automatisation' },
]

export default function EmailsPage() {
  const { t } = useI18n()
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<CampaignStatus | 'all'>('all')
  const [activeTab, setActiveTab] = useState<'campaigns' | 'templates' | 'automation'>('campaigns')
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false)
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [sendingId, setSendingId] = useState<number | null>(null)
  
  // Form state
  const [formName, setFormName] = useState('')
  const [formSubject, setFormSubject] = useState('')
  const [formStatus, setFormStatus] = useState<CampaignStatus>('draft')

  // Handlers
  const handleNewCampaign = () => {
    setEditingCampaign(null)
    setFormName('')
    setFormSubject('')
    setFormStatus('draft')
    setShowNewCampaignModal(true)
  }

  const handleEdit = (campaign: Campaign) => {
    setEditingCampaign(campaign)
    setFormName(campaign.name)
    setFormSubject(campaign.subject)
    setFormStatus(campaign.status)
    setShowNewCampaignModal(true)
  }

  const handleDelete = (id: number) => {
    const confirmMsg = t.emailMarketing?.confirmDelete || 'Voulez-vous vraiment supprimer cette campagne?'
    if (confirm(confirmMsg)) {
      setCampaigns(prev => prev.filter(c => c.id !== id))
    }
  }
  
  const handleSaveCampaign = () => {
    if (editingCampaign) {
      // Update existing campaign
      setCampaigns(prev => prev.map(c => 
        c.id === editingCampaign.id 
          ? { ...c, name: formName, subject: formSubject, status: formStatus }
          : c
      ))
    } else {
      // Create new campaign
      const newCampaign: Campaign = {
        id: Date.now(),
        name: formName || 'Nouvelle campagne',
        subject: formSubject || 'Nouvel objet',
        status: formStatus,
        sent: 0,
        opened: 0,
        clicked: 0,
        date: '',
        type: 'newsletter',
      }
      setCampaigns(prev => [newCampaign, ...prev])
    }
    setShowNewCampaignModal(false)
    setEditingCampaign(null)
  }

  const handleSend = (id: number) => {
    setSendingId(id)
    setTimeout(() => {
      setCampaigns(prev => prev.map(c => {
        if (c.id === id) {
          return { ...c, status: 'sending' as CampaignStatus, sent: 100, opened: 45, clicked: 15, date: new Date().toISOString().split('T')[0] }
        }
        return c
      }))
      setSendingId(null)
    }, 2000)
  }

  const handleDuplicate = (campaign: Campaign) => {
    const newCampaign: Campaign = {
      ...campaign,
      id: Date.now(),
      name: `${campaign.name} (Copy)`,
      status: 'draft',
      sent: 0,
      opened: 0,
      clicked: 0,
      date: '',
    }
    setCampaigns(prev => [newCampaign, ...prev])
  }

  const filteredCampaigns = campaigns.filter(c => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false
    if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const stats = {
    totalSubscribers: 15420,
    avgOpenRate: '45.2%',
    avgClickRate: '12.8%',
    sentThisMonth: 27500,
  }

  const statusConfig = {
    draft: { label: t.emailMarketing?.draft || 'Brouillon', color: 'text-gray-400', bg: 'bg-gray-500/20' },
    scheduled: { label: t.emailMarketing?.scheduled || 'Planifie', color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
    sending: { label: t.emailMarketing?.sending || 'Envoi en cours', color: 'text-blue-400', bg: 'bg-blue-500/20' },
    sent: { label: t.emailMarketing?.sent || 'Envoye', color: 'text-green-400', bg: 'bg-green-500/20' },
    failed: { label: t.emailMarketing?.failed || 'Echoue', color: 'text-red-400', bg: 'bg-red-500/20' },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[var(--font-sora)]">{t.emailMarketing?.title || 'Marketing Email'}</h1>
          <p className="text-gray-400">{t.emailMarketing?.subtitle || 'Creer et gerer les campagnes email'}</p>
        </div>
        <button 
          onClick={handleNewCampaign}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          {t.emailMarketing?.newCampaign || 'Nouvelle campagne'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t.emailMarketing?.totalSubscribers || 'Total abonnes', value: stats.totalSubscribers.toLocaleString(), icon: Users },
          { label: t.emailMarketing?.avgOpenRate || 'Taux ouverture', value: stats.avgOpenRate, icon: Mail },
          { label: t.emailMarketing?.avgClickRate || 'Taux clic', value: stats.avgClickRate, icon: TrendingUp },
          { label: t.emailMarketing?.sentThisMonth || 'Envoyes ce mois', value: stats.sentThisMonth.toLocaleString(), icon: Send },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-electron-blue/20 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-electron-blue" />
              </div>
              <div>
                <p className="text-xs text-gray-400">{stat.label}</p>
                <p className="text-lg font-bold">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="glass-card p-2 overflow-x-auto">
        <div className="flex gap-2">
          {[
            { key: 'campaigns', label: t.emailMarketing?.campaigns || 'Campagnes' },
            { key: 'templates', label: t.emailMarketing?.templates || 'Modeles' },
            { key: 'automation', label: t.emailMarketing?.automation || 'Automatisation' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-3 rounded-xl transition-all ${
                activeTab === tab.key
                  ? 'bg-electron-blue text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'campaigns' && (
        <>
          {/* Filters */}
          <div className="glass-card p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.emailMarketing?.searchPlaceholder || 'Rechercher des campagnes...'}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-electron-blue/50 transition-colors"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {['all', 'draft', 'scheduled', 'sending', 'sent'].map(status => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status as any)}
                    className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                      statusFilter === status 
                        ? 'bg-electron-blue text-white' 
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {status === 'all' ? (t.emailMarketing?.all || 'Tout') : statusConfig[status as CampaignStatus].label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Campaigns List */}
          <div className="space-y-4">
            {filteredCampaigns.map((campaign, i) => {
              const status = statusConfig[campaign.status]
              const openRate = campaign.sent > 0 ? ((campaign.opened / campaign.sent) * 100).toFixed(1) : '0'
              const clickRate = campaign.sent > 0 ? ((campaign.clicked / campaign.sent) * 100).toFixed(1) : '0'
              
              return (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card p-6"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{campaign.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${status.bg} ${status.color}`}>
                          {status.label}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{campaign.subject}</p>
                      <p className="text-xs text-gray-500">{campaign.date || (t.emailMarketing?.notScheduled || 'Non planifie')}</p>
                    </div>

                    {campaign.status === 'sent' && (
                      <div className="flex gap-6 text-sm">
                        <div className="text-center">
                          <p className="font-bold">{campaign.sent.toLocaleString()}</p>
                          <p className="text-gray-400 text-xs">{t.emailMarketing?.sent || 'Envoye'}</p>
                        </div>
                        <div className="text-center">
                          <p className="font-bold">{openRate}%</p>
                          <p className="text-gray-400 text-xs">{t.emailMarketing?.opened || 'Ouvert'}</p>
                        </div>
                        <div className="text-center">
                          <p className="font-bold">{clickRate}%</p>
                          <p className="text-gray-400 text-xs">{t.emailMarketing?.clicked || 'Clique'}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      {campaign.status === 'draft' && (
                        <button 
                          onClick={() => handleSend(campaign.id)}
                          disabled={sendingId === campaign.id}
                          className="px-4 py-2 rounded-lg bg-electron-blue hover:opacity-90 transition-opacity text-sm cursor-pointer disabled:opacity-50"
                        >
                          {sendingId === campaign.id ? (t.emailMarketing?.sending || 'Envoi...') : (t.emailMarketing?.send || 'Envoyer')}
                        </button>
                      )}
                      {campaign.status === 'scheduled' && (
                        <button 
                          onClick={() => handleEdit(campaign)}
                          className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-sm cursor-pointer"
                        >
                          {t.emailMarketing?.edit || 'Modifier'}
                        </button>
                      )}
                      {campaign.status === 'sent' && (
                        <button className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                          <BarChart3 className="w-5 h-5" />
                        </button>
                      )}
                      <button className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer" title="View">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleEdit(campaign)}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer" 
                        title="Edit"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDuplicate(campaign)}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer" 
                        title="Duplicate"
                      >
                        <Copy className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(campaign.id)}
                        className="p-2 rounded-lg hover:bg-red-500/20 transition-colors text-red-400 cursor-pointer" 
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </>
      )}

      {activeTab === 'templates' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockTemplates.map((template, i) => (
            <motion.div
              key={template.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 cursor-pointer hover:border-electron-blue/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-electron-blue/20 transition-colors">
                <Mail className="w-6 h-6 text-gray-400 group-hover:text-electron-blue transition-colors" />
              </div>
              <h3 className="font-semibold mb-1">{template.name}</h3>
              <p className="text-sm text-gray-400">{template.category}</p>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'automation' && (
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { name: 'Serie Bienvenue', trigger: 'Nouvel abonne', emails: 3, status: 'active', statusLabel: 'Actif' },
            { name: 'Panier Abandonne', trigger: 'Panier abandonne', emails: 2, status: 'active', statusLabel: 'Actif' },
            { name: 'Post-Achat', trigger: 'Commande terminee', emails: 2, status: 'paused', statusLabel: 'En pause' },
            { name: 'Rappel', trigger: 'Pas d\'achat depuis 30 jours', emails: 3, status: 'active', statusLabel: 'Actif' },
          ].map((automation, i) => (
            <motion.div
              key={automation.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{automation.name}</h3>
                  <p className="text-sm text-gray-400">Declencheur: {automation.trigger}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  automation.status === 'active' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {automation.statusLabel}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">{automation.emails} emails</p>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                    <Zap className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal for New/Edit Campaign */}
      {showNewCampaignModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 w-full max-w-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{editingCampaign ? (t.emailMarketing?.editCampaign || 'Modifier la campagne') : (t.emailMarketing?.newCampaign || 'Nouvelle campagne')}</h2>
              <button 
                onClick={() => { setShowNewCampaignModal(false); setEditingCampaign(null); }}
                className="p-2 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">{t.emailMarketing?.campaignName || 'Nom de la campagne'}</label>
                <input 
                  type="text" 
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder={t.emailMarketing?.campaignNamePlaceholder || 'Ex: Soldes ete'}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">{t.emailMarketing?.subjectLine || 'Objet'}</label>
                <input 
                  type="text" 
                  value={formSubject}
                  onChange={(e) => setFormSubject(e.target.value)}
                  placeholder={t.emailMarketing?.subjectPlaceholder || 'Ex: Grande soldes!'}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">{t.emailMarketing?.status || 'Statut'}</label>
                <select 
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value as CampaignStatus)}
                  className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer"
                  style={{ 
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    backgroundSize: '20px'
                  }}
                >
                  <option value="draft" className="bg-slate-800">{t.emailMarketing?.draft || 'Brouillon'}</option>
                  <option value="scheduled" className="bg-slate-800">{t.emailMarketing?.scheduled || 'Planifie'}</option>
                </select>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => { setShowNewCampaignModal(false); setEditingCampaign(null); }}
                  className="flex-1 px-4 py-3 rounded-xl border border-white/20 hover:bg-white/5 transition-colors"
                >
                  {t.emailMarketing?.cancel || 'Annuler'}
                </button>
                <button 
                  onClick={handleSaveCampaign}
                  className="flex-1 px-4 py-3 rounded-xl bg-electron-blue hover:opacity-90 transition-opacity"
                >
                  {editingCampaign ? (t.emailMarketing?.saveChanges || 'Enregistrer') : (t.emailMarketing?.createCampaign || 'Creer la campagne')}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}