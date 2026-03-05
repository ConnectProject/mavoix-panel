<template>
    <div>
    <q-dialog :value="opened" persistent @input="$emit('input', $event)">
        <q-card>
            <q-card-section>
            <div>
                {{ mode==="create" ?  $t('tabSettings.createTitle') : $t('tabSettings.editTitle') }}
                </div>
                <q-space/>
                <q-btn icon="close" flat round dense v-close-popup/>
            </q-card-section>

            <q-separator/>
            <q-card-section class="q-gutter-md">
                <q-input v-model="name" :label="$t('tabSettings.tabName')" filled autofocus/>
                
                <div class="text-caption q-mb-xs">{{ $t('tabSettings.backgroundColor') }}</div>
                <div class="row items-center q-gutter-sm">
                    <q-input v-model="hexColor" label="Background Color" filled>
                        <template v-slot:append>
                            <q-icon name="colorize">
                                <q-popup-proxy>
                                    <q-color v-model="hexColor" />
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                    <!-- Color preview styled as selected bg color -->
                    <div
                        :style="{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            border: '2px solid #bbb',
                            backgroundColor: hexColor || '#fff',
                            marginLeft: '8px',
                            boxShadow: hexColor ? '0 0 0 2px #7986cb inset' : ''
                        }"
                    />
                </div>
                
                
                <div>
                    <div class="text-caption q-mb-xs">{{ $t('tabSettings.icon') }}</div>
                    <div class="icon-grid q-mt-sm">
                        <q-btn
                        v-for="iconName in iconOptions"
                        :key="iconName"
                        flat
                        round
                        :color="icon === iconName ? 'primary' : 'grey'"
                        :icon="iconName"
                        @click="icon = iconName"
                        />
                    </div>
                </div>
            </q-card-section>

            <q-separator/>
            <q-card-actions align="right">
                <q-btn :label="$t('generic.cancel')" flat color="primary" v-close-popup />
                <q-btn :label="$t('generic.save')" color="primary" @click="onSave" />
                <q-btn
                  v-if="mode === 'edit'"
                  :label="$t('generic.delete')"
                  color="negative"
                  flat
                  @click="onDelete"
                />
            </q-card-actions>

        </q-card>
    </q-dialog>

    <!-- Delete confirmation -->
    <q-dialog v-model="confirmDeleteOpen" persistent>
        <q-card>
            <q-card-section>
                <div class="text-h6">{{ $t('generic.delete') }}?</div>
                <div class="text-body2 q-pt-sm">{{ $t('tabSettings.deleteConfirmMessage')}}</div>
            </q-card-section>
            <q-card-actions align="right">
                <q-btn flat :label="$t('generic.cancel')" color="primary" @click="confirmDeleteOpen = false" />
                <q-btn flat :label="$t('generic.delete')" color="negative" @click="confirmAndDelete" />
            </q-card-actions>
        </q-card>
    </q-dialog>
    </div>
</template>

<script>

export default {
    name: 'DialogTabSettings',

    data() {
        return {
            confirmDeleteOpen: false,
            name: '',
            hexColor: '',
            icon: '',
            iconOptions: ['restaurant',
                'directions_run',
                'soup_kitchen',
                'check_circle',
                'home',
                'settings',
                'local_cafe',
                'build',
                'sports_bar',
                'wine_bar',
                'calculate',
                'flag',
                'category',
                'favorite',
                'star']
        }
    },

    props: {
        value: {
            type: Boolean,
            required: true
        },

        mode: {
            type: String,
            required: true
        },
        tab: {
            type: Object,
            required: false
        }
    },

    computed: {
        opened() {
            return this.value // tab editor passes :value="$store.getters['tabEditor/tabSettingsDialogOpened']" and Home layout passes :value="$store.getters['tabs/createTabDialogOpened']"
        }
    },

    watch: {
        opened(newVal) {
            if (newVal) {
                if (this.mode === 'edit' && this.tab) {
                    this.name = this.tab.name;
                    this.hexColor = this.tab.hexColor;
                    this.icon = this.tab.icon;
                }
            }
        }
    },

    methods: {  
        onSave() {
            if(!this.name) {
                this.$q.notify({
                    message: this.$t('tabSettings.nameRequired'),
                    color: 'negative'
                })
                return
            }
            if(!this.hexColor) {
                this.$q.notify({
                    message: this.$t('tabSettings.backgroundColorRequired'),
                    color: 'negative'
                })
                return
            }
            
            if(this.mode === 'create') {
                this.$store.dispatch('tabs/createTabCb', {
                    name: this.name,
                    hexColor: this.hexColor,
                    icon: this.icon,    
                    callback: (tab) => {
                        this.$emit('input', false)
                        this.$router.push({
                            name: 'tab',
                            params: { slug: tab.get('slug') }
                        })
                    }
                })
            } else if(this.mode === 'edit' && this.tab) {
                this.$store.dispatch('tabEditor/updateTab', {
                    name: this.name,
                    hexColor: this.hexColor,
                    icon: this.icon,
                    callback: () => {
                        this.$emit('input', false)
                    }
                })
            } else {
                this.$q.notify({
                    message: 'Error updating tab',
                    color: 'negative'
                })
            }
        },

        onDelete() {
            this.confirmDeleteOpen = true
        },

        confirmAndDelete() {
            this.confirmDeleteOpen = false
            this.$store.dispatch('tabEditor/deleteTab')
            this.$emit('input', false)
            this.$router.push({ name: 'home' })
        }
    }
}

</script>