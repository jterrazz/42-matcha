<template>
  <b-navbar
    fixed="top"
    variant="white"
    class="shadow-sm"
    toggleable="lg"
  >
    <b-container>
      <b-collapse id="nav-  collapse" is-nav>
        <b-navbar-brand :to="{ name: 'home' }">Matcha</b-navbar-brand>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'home' }">Home</b-nav-item>
          <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>
          <b-nav-item :to="{ name: 'discover' }">Discover</b-nav-item>
          <b-nav-item :to="{ name: 'messages' }">Messages</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template slot="button-content">
              <Badge :count="notificationCount" :padding="7">
                <img src="../../assets/bell.svg" alt="disconnect" height="20" />
              </Badge>
            </template>
            <div v-if="me">
              <NotificationRow v-for="n in me.notifications" :key="n.id" v-bind="n"/>
            </div>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="me" right>
            <b-nav-item :to="{ name: 'user', params: { username: me.username } }">My Profile</b-nav-item>
            <b-nav-item :to="{ name: 'settings' }">Settings</b-nav-item>
            <b-nav-item :to="{ name: 'logout' }">Disconnect</b-nav-item>
          </b-nav-item-dropdown>

          <b-nav-item>
            <img src="../../assets/power.svg" alt="disconnect" height="20" />
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
  import { mapState } from "vuex";
    import NotificationRow from "../../components/molecules/NotificationRow";
    import Badge from "../../components/atoms/Bagde";

  export default {
      name: "TheNavBar",
      components: {
          Badge, NotificationRow
      },
      data: function() {
          return {
              isAuthPage: ["login", "register"].indexOf(this.$route.name) >= 0
          };
      },
      computed: {
          ...mapState({
              me: state => state.auth.me.infos
          }),
          notificationCount: function() {
              if (!this.me) return 0;
              return this.me.notifications.filter(el => !el.seen).length
          }
      }
  };
</script>

<style>
  .nav-link.dropdown-toggle {
    display: flex;
    align-items: center;
  }
  .dropdown-toggle::after {
    display: none !important;
  }
</style>
