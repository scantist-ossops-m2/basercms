import Vue from 'vue';
import axios from 'axios';

export default Vue.extend({
    /**
     * Name
     */
    name: 'UserIndex',
    /**
      * Props
      */
    props: {
        accessToken: String
    },
    /**
     * Data
     * @returns {{users: null}}
     */
    data: function() {
        return {
            users: null,
        }
    },
    /**
     * Mounted
     */
    mounted: function() {
        this.$emit('set-title', 'ユーザー一覧')
        if (this.accessToken) {
            this.getUsers()
            this.$emit('set-add-link', 'user_add')
        } else {
            this.$router.push('/')
        }
    },
    /**
     * Methods
     */
    methods: {
        /**
         * Get Users
         */
        getUsers: function () {
            axios.get('/baser/api/baser-core/users/index.json', {
                headers: {"Authorization": this.accessToken},
                data: {}
            }).then((response) => {
                if (response.data) {
                    this.users = response.data.users;
                } else {
                    this.$router.push('/');
                }
            });
        }
    }
});
