<template>
  <q-dialog
    :value="value"
    @input="$emit('input', $event)"
    @show="reset"
  >
    <q-card class="account-card">
      <q-card-section class="row items-center no-wrap q-pb-none">
        <div class="text-h6 col">
          {{ $t('account.title') }}
        </div>
        <q-btn
          v-close-popup
          flat
          round
          dense
          icon="close"
          :aria-label="$t('account.close')"
        />
      </q-card-section>

      <q-tabs
        v-model="tab"
        dense
        no-caps
        align="left"
        active-color="primary"
        indicator-color="primary"
        class="q-mt-sm"
        @input="clearPasswords"
      >
        <q-tab
          name="email"
          :label="$t('auth.email')"
        />
        <q-tab
          name="password"
          :label="$t('auth.password')"
        />
        <q-tab
          name="delete"
          class="text-negative"
          :label="$t('account.deleteHeading')"
        />
      </q-tabs>
      <q-separator />

      <q-tab-panels
        v-model="tab"
        animated
      >
        <!-- Email -->
        <q-tab-panel
          name="email"
          class="q-pa-md"
        >
          <q-form
            class="q-gutter-md"
            @submit="onUpdateEmail"
          >
            <q-input
              v-model="email"
              type="email"
              outlined
              autocomplete="email"
              :label="$t('auth.email')"
            />
            <q-input
              v-model="password"
              type="password"
              outlined
              autocomplete="current-password"
              :label="$t('account.currentPassword')"
            />
            <div class="row justify-end">
              <q-btn
                type="submit"
                unelevated
                no-caps
                color="primary"
                :loading="busy === 'email'"
                :disable="!canEmail"
                :label="$t('account.updateEmail')"
              />
            </div>
          </q-form>
        </q-tab-panel>

        <!-- Password -->
        <q-tab-panel
          name="password"
          class="q-pa-md"
        >
          <q-form
            class="q-gutter-md"
            @submit="onUpdatePassword"
          >
            <q-input
              v-model="password"
              type="password"
              outlined
              autocomplete="current-password"
              :label="$t('account.currentPassword')"
            />
            <q-input
              v-model="newPassword"
              type="password"
              outlined
              autocomplete="new-password"
              :label="$t('account.newPassword')"
            />
            <div class="row justify-end">
              <q-btn
                type="submit"
                unelevated
                no-caps
                color="primary"
                :loading="busy === 'password'"
                :disable="!password || !newPassword"
                :label="$t('account.changePassword')"
              />
            </div>
          </q-form>
        </q-tab-panel>

        <!-- Delete -->
        <q-tab-panel
          name="delete"
          class="q-pa-md"
        >
          <q-form
            class="q-gutter-md"
            @submit="onDelete"
          >
            <q-banner
              rounded
              class="bg-red-1 text-negative"
            >
              <template #avatar>
                <q-icon name="warning" />
              </template>
              {{ $t('account.deleteWarning') }}
            </q-banner>
            <q-input
              v-model="password"
              type="password"
              outlined
              autocomplete="current-password"
              :label="$t('account.currentPassword')"
            />
            <div class="row justify-end">
              <q-btn
                type="submit"
                unelevated
                no-caps
                color="negative"
                :loading="busy === 'delete'"
                :disable="!password"
                :label="$t('account.deleteButton')"
              />
            </div>
          </q-form>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-dialog>
</template>

<script>
import Parse from 'parse'

import { accountErrorKey } from '~/store/users/actions'

export default {
  name: 'DialogAccount',
  props: {
    value: { type: Boolean, default: false }
  },
  data () {
    return { tab: 'email', email: '', password: '', newPassword: '', busy: null }
  },
  computed: {
    canEmail () {
      const user = Parse.User.current()

      return Boolean(this.password && this.email && user && this.email !== user.getUsername())
    }
  },
  methods: {
    clearPasswords () {
      this.password = ''
      this.newPassword = ''
    },
    reset () {
      this.tab = 'email'
      const user = Parse.User.current()
      this.email = user ? user.getUsername() : ''
      this.password = ''
      this.newPassword = ''
    },
    async run (name, action, successKey) {
      this.busy = name
      try {
        await action()
        if (successKey) {
          this.$q.notify({ position: 'top-right', color: 'positive', message: this.$t(`account.${successKey}`) })
        }

        return true
      } catch (err) {
        this.$q.notify({ position: 'top-right', color: 'negative', message: this.$t(`account.${accountErrorKey(err)}`) })

        return false
      } finally {
        this.busy = null
      }
    },
    async onUpdateEmail () {
      const done = await this.run(
        'email',
        () => this.$store.dispatch('users/updateEmail', { email: this.email, password: this.password }),
        'emailUpdated'
      )
      if (done) {
        this.password = ''
      }
    },
    async onUpdatePassword () {
      const done = await this.run(
        'password',
        () => this.$store.dispatch('users/updatePassword', { password: this.password, newPassword: this.newPassword }),
        'passwordUpdated'
      )
      if (done) {
        this.password = ''
        this.newPassword = ''
      }
    },
    onDelete () {
      this.$q.dialog({
        title: this.$t('account.deleteHeading'),
        message: this.$t('account.deleteWarning'),
        cancel: true,
        persistent: true
      }).onOk(this.deleteAccount)
    },
    async deleteAccount () {
      const done = await this.run(
        'delete',
        () => this.$store.dispatch('users/deleteAccount', { password: this.password }),
        'accountDeleted'
      )
      if (done) {
        this.$emit('input', false)
        this.$emit('deleted')
      }
    }
  }
}
</script>

<style scoped>
.account-card {
  width: 460px;
  max-width: 92vw;
}
</style>
