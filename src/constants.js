const config = {
    URL: 'http://192.168.1.22:8080/',
    API: {
        MENUS: {
            FIND_MENU: 'all-menu',
            CREATE_MENU: 'create-menu',
            CATEGORY_MENU: 'category-menu',
            DELETE_MENU: 'delete-menu'
        },
        CATEGORY: {
            FIND_CATEGORY: 'find-category',
            CREATE_CATEGORY: 'create-category',
            UPDATE_CATEGORY: 'update-category',
        },
        BOOKING: {
            FIND_BOOKING: 'findAll-table',
            FIND_ONE_BOOKING: 'FindOne-booking',
            ADMIN_CREATE_BOOKING: 'create-table',
            UPDATE_BOOKING: 'booking_status-update',
            CREATE_BOOKING: 'create-booking',
            UPDATE_STATUS_LATE: 'late_status-update',
            BOOKINGS: 'booking',
            BOOKING_TIME: 'booking_time',
            FIND_WALKIN: 'Find_WalkIn'
        },
        LOGIN: {
            AUTH_ADMIN: 'auth-admin',
            CREATE_ADMIN: 'create-admin'
        },
        ORDERS: {
            FIND_ORDER_BY_BK: 'order',
            FIND_ALL_ORDER: 'All-Order',
            GET_ORDERS: 'get-Orders',
            CREATE_ORDER: 'create-order',
            UPDATE_ORDER: 'update-order-status',
            // DELETE_ORDER: 'delete-order'    
        },
        STORES: {
            FIND_STORE: 'show-shop',
            CREATE_STORE: 'create-shop',
            UPDATE_SHOP: 'update-shop',
            // DELETE_SHOP: 'delete-shop'
        },
        TIMES: {
            FIND_TIME: 'Find_time',
            CREATE_TIME: 'Create_time',
            // UPDATE_TIME: 'update-time',
            DELETE_TIME: 'Delete_time'
        },
        REPORT: {
            FIND_REPORT: 'report-and-excel',
        },
        QR: {
            FIND_QR: 'find-qr',
            CREATE_QR: 'QR-code',
            UPDATE_QR: 'update-qr',
            DELETE_QR: 'delete-qr'
        }
    }
}

module.exports = config