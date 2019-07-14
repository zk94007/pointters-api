module.exports = {
    getConversations: require('./conversations-get'),
    getConversationsSearch: require('./conversations-search-get'),    
    postConversation: require('./conversation-post'),
    putConversation: require('./conversation-put'),
    getConversationMessages: require('./conversation-id-message-get')
};
