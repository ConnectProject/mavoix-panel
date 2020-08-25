<template>
  <div
    id="app"
    class="min-h-screen w-screen bg-gray-200 flex flex-col pt-20 justify-center items-center md:items-start md:flex-row"
  >
    <div class="w-full max-w-md text-center px-3">
      <p class="mb-2 text-gray-700 font-semibold font-sans tracking-wide">List 1</p>
      <draggable
        tag="ul"
        group="all-users"
        class="draggable-list "
        ghost-class="moving-card"
        filter=".action-button"
        :list="items"
        :animation="200"
      >
        <li
          v-for="item in items"
          :item="item"
          :key="item.id"
          class="li"
        >
          <div class="flex items-center">
            <img class="w-10 h-10 rounded-full" :src="item.asset.url" :alt="item.name">
            <p class="ml-2 text-gray-700 font-semibold font-sans tracking-wide">{{item.name}}</p>
          </div>
          <div class="flex">
            <button
              aria-label="Edit item"
              class="action-button p-1 focus:outline-none focus:shadow-outline text-teal-500 hover:text-teal-600"
              @click="onEdit(item)"
            >
              <EditIcon/>
            </button>
            <button
              aria-label="Delete item"
              class="action-button p-1 focus:outline-none focus:shadow-outline text-red-500 hover:text-red-600"
              @click="onDelete(item)"
            >
              <Trash2Icon/>
            </button>
          </div>
        </li>
      </draggable>
    </div>

    <div class="w-full max-w-md md:ml-6 text-center px-3">
      <p class="mb-2 text-gray-700 font-semibold font-sans tracking-wide">List 2</p>
      <draggable
        tag="ul"
        group="all-users"
        class="draggable-list"
        ghost-class="moving-card"
        filter=".action-button"
        :list="newUsers"
        :animation="200"
      >
        <li
          v-for="user in newUsers"
          :user="user"
          :key="user.id"
          class="p-4 mb-3 flex justify-between items-center bg-white border border-white shadow rounded-lg cursor-move"
        >
          <div class="flex items-center">
            <q-img :ratio="16/9" class="img" :src="user.avatar" :alt="user.name" />
            <p class="ml-2 text-gray-700 font-semibold font-sans tracking-wide">{{user.name}}</p>
          </div>
          <div class="flex">
            <button
              aria-label="Edit user"
              class="action-button p-1 focus:outline-none focus:shadow-outline text-teal-500 hover:text-teal-600"
              @click="onEdit(user)"
            >
              Edit
            </button>
            <button
              aria-label="Delete user"
              class="action-button p-1 focus:outline-none focus:shadow-outline text-red-500 hover:text-red-600"
              @click="onDelete(user)"
            >
              Delite
            </button>
          </div>
        </li>
      </draggable>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      users: [
        {
          id: 1,
          name: 'Adrian Schubert',
          avatar:
            'https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png'
        },
        {
          id: 2,
          name: 'Violet Gates',
          avatar: 'https://pickaface.net/gallery/avatar/freud51c8b3f65e7dc.png'
        },
        {
          id: 3,
          name: 'Steve Jobs',
          avatar: 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png'
        },
        {
          id: 4,
          name: 'Yassine Smith',
          avatar:
            'https://pickaface.net/gallery/avatar/unr_yassine_191124_2012_3gngr.png'
        },
        {
          id: 5,
          name: 'Senior Saez',
          avatar:
            'https://pickaface.net/gallery/avatar/elmedinilla541c03412955c.png'
        }
      ],
      newUsers: [
        {
          id: 6,
          name: 'Steve Jobs',
          avatar: 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png'
        },
        {
          id: 7,
          name: 'Yassine Smith',
          avatar:
            'https://pickaface.net/gallery/avatar/unr_yassine_191124_2012_3gngr.png'
        },
        {
          id: 8,
          name: 'Senior Saez',
          avatar:
            'https://pickaface.net/gallery/avatar/elmedinilla541c03412955c.png'
        },
        {
          id: 9,
          name: 'Adrian Schubert',
          avatar:
            'https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png'
        },
        {
          id: 10,
          name: 'Violet Gates',
          avatar: 'https://pickaface.net/gallery/avatar/freud51c8b3f65e7dc.png'
        }
      ]
    }
  },
  computed: {
    items: {
      get () {
        let items = this.$store.getters['tabEditor/items']
        return items
      },
      set (values) {
        this.$store.commit('tabEditor/setItemsRaw', values)
      }
    }
  },
  methods: {
    onEdit (user) {
      alert(`Editing ${user.name}`)
    },
    onDelete (user) {
      alert(`Deleting ${user.name}`)
    }
  }
}
</script>
<style>
.draggable-list {
  min-height: 100px;
}
.moving-card {
  opacity: 0.5;
  background: #F7FAFC;
  border: 1px solid #4299e1;
}
.li{
  display: inline-block
}

</style>
