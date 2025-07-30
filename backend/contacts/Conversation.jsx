import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiPlus, FiUser, FiMessageSquare, FiStar, FiClock, FiX, FiSmile, FiPaperclip, FiZap, FiFolder, FiEdit2, FiTrash2, FiMoreVertical, FiPhone, FiMail } from 'react-icons/fi';
import Sidebar from '../../components/Sidebar'; // Import Sidebar component
import axios from 'axios'; // Import Axios
import './Conversation.css';

const Conversation = () => {
  const [activeTab, setActiveTab] = useState('conversations');
  const [activeSubTab, setActiveSubTab] = useState('unread');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSnippetDropdown, setShowSnippetDropdown] = useState(false);
  const [showTextSnippetModal, setShowTextSnippetModal] = useState(false);
  const [showEmailSnippetModal, setShowEmailSnippetModal] = useState(false);
  const [activeTriggerTab, setActiveTriggerTab] = useState('links');
  const [activeFolder, setActiveFolder] = useState('all');
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showAddConversationModal, setShowAddConversationModal] = useState(false);
  const [newConversation, setNewConversation] = useState({
    name: '',
    email: '',
    contact: '',
    timestamp: new Date().toLocaleTimeString(),
    unread: true,
    avatar: '👤'
  });
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({});
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterUnread, setFilterUnread] = useState(false);
  const [filterStarred, setFilterStarred] = useState(false);
  const [editSnippet, setEditSnippet] = useState(null);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [showAddLinkModal, setShowAddLinkModal] = useState(false);
  const [newLink, setNewLink] = useState({ name: '', url: '' });
  const [links, setLinks] = useState([]);
  const [editLink, setEditLink] = useState(null);
  const [mockFolders, setMockFolders] = useState([]);
  const [mockSnippets, setMockSnippets] = useState([]);
  const [mockActions, setMockActions] = useState([]);

  // Fetch conversations on component mount
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/conversations');
        setConversations(response.data);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };
    fetchConversations();
  }, []);

  // Fetch messages for the selected conversation
  useEffect(() => {
    if (selectedConversation) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/conversations/${selectedConversation}/messages`);
          setMessages((prevMessages) => ({
            ...prevMessages,
            [selectedConversation]: response.data,
          }));
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };
      fetchMessages();
    }
  }, [selectedConversation]);

  // Fetch snippets and folders when the snippets tab is active
  useEffect(() => {
    if (activeTab === 'snippets') {
      const fetchSnippets = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/snippets');
          setMockSnippets(response.data);
        } catch (error) {
          console.error('Error fetching snippets:', error);
        }
      };
      fetchSnippets();

      const fetchFolders = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/folders');
          setMockFolders(response.data);
        } catch (error) {
          console.error('Error fetching folders:', error);
        }
      };
      fetchFolders();
    }
  }, [activeTab]);

  // Fetch manual actions when the manualActions tab is active
  useEffect(() => {
    if (activeTab === 'manualActions') {
      const fetchManualActions = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/manual-actions');
          setMockActions(response.data);
        } catch (error) {
          console.error('Error fetching manual actions:', error);
        }
      };
      fetchManualActions();
    }
  }, [activeTab]);

  // Fetch trigger links when the triggerLinks tab is active
  useEffect(() => {
    if (activeTab === 'triggerLinks') {
      const fetchTriggerLinks = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/trigger-links');
          setLinks(response.data);
        } catch (error) {
          console.error('Error fetching trigger links:', error);
        }
      };
      fetchTriggerLinks();
    }
  }, [activeTab]);

  // Handle adding a new conversation
  const handleAddConversation = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/conversations', newConversation);
      setConversations([...conversations, response.data]);
      setMessages({ ...messages, [response.data.id]: [] });
      setNewConversation({
        name: '',
        email: '',
        contact: '',
        timestamp: new Date().toLocaleTimeString(),
        unread: true,
        avatar: '👤'
      });
      setShowAddConversationModal(false);
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };

  // Handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    const messageContent = e.target.message.value;
    if (messageContent.trim() === '') return;

    try {
      const newMessage = {
        conversationId: selectedConversation,
        sender: 'Agent',
        content: messageContent,
        time: new Date().toLocaleTimeString(),
        type: 'sent'
      };
      const response = await axios.post('http://localhost:5000/api/messages', newMessage);
      setMessages({
        ...messages,
        [selectedConversation]: [...messages[selectedConversation], response.data],
      });
      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          conv.id === selectedConversation
            ? { ...conv, lastMessage: messageContent, timestamp: newMessage.time }
            : conv
        )
      );
      e.target.message.value = '';
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Handle saving a text snippet
  const handleSaveTextSnippet = async () => {
    const name = document.querySelector('#textSnippetName').value;
    const content = document.querySelector('#textSnippetContent').value;
    const folder = document.querySelector('#textSnippetFolder').value;

    try {
      const newSnippet = {
        name,
        content,
        folder,
        type: 'text'
      };
      if (editSnippet) {
        const response = await axios.put(`http://localhost:5000/api/snippets/${editSnippet.id}`, newSnippet);
        setMockSnippets((prevSnippets) =>
          prevSnippets.map((snippet) =>
            snippet.id === editSnippet.id ? response.data : snippet
          )
        );
      } else {
        const response = await axios.post('http://localhost:5000/api/snippets', newSnippet);
        setMockSnippets([...mockSnippets, response.data]);
        setMockFolders((prevFolders) =>
          prevFolders.map((f) =>
            f.id === folder ? { ...f, count: f.count + 1 } : f
          )
        );
      }
      setShowTextSnippetModal(false);
      setEditSnippet(null);
    } catch (error) {
      console.error('Error saving snippet:', error);
    }
  };

  // Handle saving an email snippet
  const handleSaveEmailSnippet = async () => {
    const name = document.querySelector('#emailSnippetName').value;
    const subject = document.querySelector('#emailSnippetSubject').value;
    const content = document.querySelector('#emailSnippetContent').value;
    const folder = document.querySelector('#emailSnippetFolder').value;

    try {
      const newSnippet = {
        name,
        subject,
        content,
        folder,
        type: 'email'
      };
      if (editSnippet) {
        const response = await axios.put(`http://localhost:5000/api/snippets/${editSnippet.id}`, newSnippet);
        setMockSnippets((prevSnippets) =>
          prevSnippets.map((snippet) =>
            snippet.id === editSnippet.id ? response.data : snippet
          )
        );
      } else {
        const response = await axios.post('http://localhost:5000/api/snippets', newSnippet);
        setMockSnippets([...mockSnippets, response.data]);
        setMockFolders((prevFolders) =>
          prevFolders.map((f) =>
            f.id === folder ? { ...f, count: f.count + 1 } : f
          )
        );
      }
      setShowEmailSnippetModal(false);
      setEditSnippet(null);
    } catch (error) {
      console.error('Error saving snippet:', error);
    }
  };

  // Handle creating a folder
  const handleCreateFolder = async () => {
    const name = document.querySelector('#folderName').value;

    try {
      const newFolder = {
        name,
        count: 0
      };
      const response = await axios.post('http://localhost:5000/api/folders', newFolder);
      setMockFolders([...mockFolders, response.data]);
      setShowFolderModal(false);
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  };

  // Handle deleting a snippet
  const handleDeleteSnippet = async (snippetId) => {
    try {
      await axios.delete(`http://localhost:5000/api/snippets/${snippetId}`);
      setMockSnippets((prevSnippets) =>
        prevSnippets.filter((snippet) => snippet.id !== snippetId)
      );
      setShowDeleteSuccess(true);
      setTimeout(() => setShowDeleteSuccess(false), 3000);
    } catch (error) {
      console.error('Error deleting snippet:', error);
    }
  };

  // Handle adding a trigger link
  const handleAddLink = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/trigger-links', newLink);
      setLinks([...links, response.data]);
      setNewLink({ name: '', url: '' });
      setShowAddLinkModal(false);
    } catch (error) {
      console.error('Error adding link:', error);
    }
  };

  // Handle saving a trigger link
  const handleSaveLink = async (e) => {
    e.preventDefault();
    try {
      const updatedLink = { id: editLink.id, ...newLink };
      const response = await axios.put(`http://localhost:5000/api/trigger-links/${editLink.id}`, updatedLink);
      setLinks((prevLinks) =>
        prevLinks.map((link) =>
          link.id === editLink.id ? response.data : link
        )
      );
      setEditLink(null);
      setShowAddLinkModal(false);
    } catch (error) {
      console.error('Error saving link:', error);
    }
  };

  // Handle deleting a trigger link
  const handleDeleteLink = async (linkId) => {
    try {
      await axios.delete(`http://localhost:5000/api/trigger-links/${linkId}`);
      setLinks((prevLinks) => prevLinks.filter((link) => link.id !== linkId));
    } catch (error) {
      console.error('Error deleting link:', error);
    }
  };

  // Filter conversations based on search query and filters
  const filteredConversations = conversations.filter((conv) => {
    if (filterUnread && !conv.unread) return false;
    if (filterStarred && !conv.starred) return false;
    if (searchQuery) {
      return (
        conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  // Filter snippets based on active folder
  const filteredSnippets = mockSnippets.filter((snippet) =>
    activeFolder === 'all' || snippet.folder === activeFolder
  );

  const handleEditSnippet = (snippet) => {
    setEditSnippet(snippet);
    if (snippet.type === 'text') {
      setShowTextSnippetModal(true);
    } else if (snippet.type === 'email') {
      setShowEmailSnippetModal(true);
    }
  };

  const applyFilters = () => {
    setShowFilterModal(false);
  };

  // Render the component
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <nav className="nav">
          <div className="tabs">
            {[
              { id: 'conversations', label: 'Conversations' },
              { id: 'manualActions', label: 'Manual Actions' },
              { id: 'snippets', label: 'Snippets' },
              { id: 'triggerLinks', label: 'Trigger Links' },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="content">
          {activeTab === 'conversations' && (
            <div className="conversations-layout">
              <div className="conversations-sidebar">
                <div className="sub-tabs">
                  {[
                    { id: 'unread', label: 'Unread', icon: <FiMessageSquare /> },
                    { id: 'starred', label: 'Starred', icon: <FiStar /> },
                    { id: 'recent', label: 'Recent', icon: <FiClock /> },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      className={`sub-tab ${activeSubTab === tab.id ? 'active' : ''}`}
                      onClick={() => setActiveSubTab(tab.id)}
                    >
                      {tab.icon && <span className="tab-icon">{tab.icon}</span>}
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="search-bar">
                  <div className="search-input">
                    <FiSearch className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search conversations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="search-actions">
                    <button className="icon-button" onClick={() => setShowFilterModal(true)}>
                      <FiFilter />
                    </button>
                    <button className="icon-button" onClick={() => setShowAddConversationModal(true)}>
                      <FiPlus />
                    </button>
                  </div>
                </div>

                <div className="conversations-list">
                  {filteredConversations.length > 0 ? (
                    filteredConversations.map((conv) => (
                      <div
                        key={conv.id}
                        className={`conversation-item ${selectedConversation === conv.id ? 'selected' : ''} ${conv.unread ? 'unread' : ''}`}
                        onClick={() => setSelectedConversation(conv.id)}
                      >
                        <div className="conversation-avatar">{conv.avatar}</div>
                        <div className="conversation-info">
                          <div className="conversation-header">
                            <h4>{conv.name}</h4>
                            <span className="timestamp">{conv.timestamp}</span>
                          </div>
                          <p className="last-message">{conv.lastMessage}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="empty-state">
                      <div className="empty-icon">💬</div>
                      <p>No conversations found</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="conversation-main">
                {selectedConversation ? (
                  <div className="selected-conversation">
                    <div className="conversation-header">
                      <div className="contact-info">
                        <div className="avatar">
                          {conversations.find((c) => c.id === selectedConversation)?.avatar}
                        </div>
                        <h3>{conversations.find((c) => c.id === selectedConversation)?.name}</h3>
                      </div>
                    </div>
                    <div className="messages-container">
                      {messages[selectedConversation]?.map((message) => (
                        <div key={message.id} className={`message ${message.type}`}>
                          <div className="message-content">
                            <p>{message.content}</p>
                            <span className="message-time">{message.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="message-input">
                      <form onSubmit={handleSendMessage}>
                        <input type="text" name="message" placeholder="Type your message..." />
                        <button className="send-button" type="submit">Send</button>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">💭</div>
                    <h3>No conversation selected</h3>
                    <p>Select a conversation to start messaging</p>
                  </div>
                )}
              </div>

              <div className="contact-details">
                {selectedConversation ? (
                  <div className="contact-info-panel">
                    <div className="contact-header">
                      <div className="large-avatar">
                        {conversations.find((c) => c.id === selectedConversation)?.avatar}
                      </div>
                      <h3>{conversations.find((c) => c.id === selectedConversation)?.name}</h3>
                    </div>
                    <div className="contact-details-content">
                      <div className="detail-section">
                        <h4>Contact Information</h4>
                        <p><FiUser /> Customer since 2023</p>
                        <p><FiPhone /> {conversations.find((c) => c.id === selectedConversation)?.contact || 'N/A'}</p>
                        <p><FiMail /> {conversations.find((c) => c.id === selectedConversation)?.email || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">👤</div>
                    <h3>No contact selected</h3>
                    <p>Select a conversation to view contact details</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'manualActions' && (
            <div className="manual-actions">
              <div className="actions-header">
                <h2>Manual Actions</h2>
                <div className="actions-controls">
                  <input type="text" placeholder="Type to Search Workflows" />
                  <select>
                    <option>Select Assignee</option>
                    <option>John Doe</option>
                    <option>Sarah Smith</option>
                  </select>
                  <button className="primary-button">Let's start</button>
                </div>
              </div>

              {mockActions.length > 0 ? (
                <div className="actions-list">
                  {mockActions.map((action) => (
                    <div key={action.id} className="action-card">
                      <h3>{action.title}</h3>
                      <p>{action.description}</p>
                      <div className="action-meta">
                        <span>Assignee: {action.assignee}</span>
                        <span>Priority: {action.priority}</span>
                        <span>Due: {action.dueDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="success-state">
                  <div className="success-icon">✓</div>
                  <h3>Good Work!</h3>
                  <p>You have no pending tasks</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'snippets' && (
            <div className="snippets">
              <div className="snippets-wrapper">
                <div className="snippets-sidebar">
                  <div className="search-input">
                    <FiSearch className="search-icon" />
                    <input type="text" placeholder="Search snippets..." />
                  </div>
                  <div className="folder-list">
                    {mockFolders.map((folder) => (
                      <div
                        key={folder.id}
                        className={`folder-item ${activeFolder === folder.id ? 'active' : ''}`}
                        onClick={() => setActiveFolder(folder.id)}
                      >
                        <FiFolder />
                        <span>{folder.name}</span>
                        <span className="text-secondary">({folder.count})</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="snippets-main">
                  <div className="snippets-header">
                    <h2>Snippets</h2>
                    <p>Create snippets to quickly insert predefined content into messages for faster, consistent communication.</p>
                    <div className="snippets-actions">
                      <button
                        className="secondary-button"
                        onClick={() => setShowFolderModal(true)}
                      >
                        <FiFolder /> Add Folder
                      </button>
                      <div className="dropdown-container">
                        <button
                          className="primary-button"
                          onClick={() => setShowSnippetDropdown(!showSnippetDropdown)}
                        >
                          Add Snippet
                        </button>
                        {showSnippetDropdown && (
                          <div className="dropdown-menu">
                            <button onClick={() => {
                              setShowTextSnippetModal(true);
                              setShowSnippetDropdown(false);
                            }}>Add Text Snippet</button>
                            <button onClick={() => {
                              setShowEmailSnippetModal(true);
                              setShowSnippetDropdown(false);
                            }}>Add Email Snippet</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="snippets-content">
                    {filteredSnippets.length > 0 ? (
                      filteredSnippets.map((snippet) => (
                        <div key={snippet.id} className="snippet-card">
                          <div className="snippet-header">
                            <h3>{snippet.name}</h3>
                            <div className="snippet-actions">
                              <button className="icon-button" onClick={() => handleEditSnippet(snippet)}><FiEdit2 /></button>
                              <button className="icon-button" onClick={() => handleDeleteSnippet(snippet.id)}><FiTrash2 /></button>
                              <button className="icon-button"><FiMoreVertical /></button>
                            </div>
                          </div>
                          <p>{snippet.content.substring(0, 100)}...</p>
                        </div>
                      ))
                    ) : (
                      <div className="empty-state">
                        <div className="empty-icon">📄</div>
                        <p>No snippets found</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {showTextSnippetModal && (
                <div className="modal-overlay">
                  <div className="modal">
                    <div className="modal-header">
                      <h3>{editSnippet ? 'Edit Text Snippet' : 'Create Text Snippet'}</h3>
                      <button className="close-button" onClick={() => { setShowTextSnippetModal(false); setEditSnippet(null); }}>
                        <FiX />
                      </button>
                    </div>
                    <div className="modal-content">
                      <div className="form-group">
                        <label>Name <span className="required">*</span></label>
                        <input id="textSnippetName" type="text" placeholder="Enter Snippet Name" defaultValue={editSnippet?.name || ''} />
                      </div>
                      <div className="form-group">
                        <label>Snippets Body <span className="required">*</span></label>
                        <div className="text-editor">
                          <div className="editor-toolbar">
                            <button><FiSmile /></button>
                            <button><FiPaperclip /></button>
                            <button><FiZap /></button>
                          </div>
                          <textarea id="textSnippetContent" placeholder="Type a message" defaultValue={editSnippet?.content || ''}></textarea>
                          <div className="editor-footer">
                            <span>Approximate Cost: $0</span>
                            <span>0 characters | 0 words | 0 segs</span>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Folder</label>
                        <select id="textSnippetFolder" defaultValue={editSnippet?.folder || ''}>
                          {mockFolders.map((folder) => (
                            <option key={folder.id} value={folder.id}>{folder.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button className="secondary-button" onClick={() => { setShowTextSnippetModal(false); setEditSnippet(null); }}>Cancel</button>
                      <button className="primary-button" onClick={handleSaveTextSnippet}>Save</button>
                    </div>
                  </div>
                </div>
              )}

              {showEmailSnippetModal && (
                <div className="modal-overlay">
                  <div className="modal">
                    <div className="modal-header">
                      <h3>{editSnippet ? 'Edit Email Snippet' : 'Create Email Snippet'}</h3>
                      <button className="close-button" onClick={() => { setShowEmailSnippetModal(false); setEditSnippet(null); }}>
                        <FiX />
                      </button>
                    </div>
                    <div className="modal-content">
                      <div className="form-group">
                        <label>Name <span className="required">*</span></label>
                        <input id="emailSnippetName" type="text" placeholder="Enter Snippet Name" defaultValue={editSnippet?.name || ''} />
                      </div>
                      <div className="form-group">
                        <label>Subject <span className="required">*</span></label>
                        <input id="emailSnippetSubject" type="text" placeholder="Enter Subject" defaultValue={editSnippet?.subject || ''} />
                      </div>
                      <div className="form-group">
                        <label>Snippets Body <span className="required">*</span></label>
                        <div className="rich-text-editor">
                          <div className="editor-toolbar">
                            <select><option>Paragraph</option></select>
                            <select><option>14px</option></select>
                            <select><option>1.5</option></select>
                            <select><option>Verdana</option></select>
                          </div>
                          <textarea id="emailSnippetContent" placeholder="Type a message" defaultValue={editSnippet?.content || ''}></textarea>
                          <div className="editor-footer">
                            <span>0 characters | 0 words</span>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Folder</label>
                        <select id="emailSnippetFolder" defaultValue={editSnippet?.folder || ''}>
                          {mockFolders.map((folder) => (
                            <option key={folder.id} value={folder.id}>{folder.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button className="secondary-button" onClick={() => { setShowEmailSnippetModal(false); setEditSnippet(null); }}>Cancel</button>
                      <button className="primary-button" onClick={handleSaveEmailSnippet}>Save</button>
                    </div>
                  </div>
                </div>
              )}

              {showFolderModal && (
                <div className="modal-overlay">
                  <div className="modal">
                    <div className="modal-header">
                      <h3>Create New Folder</h3>
                      <button className="close-button" onClick={() => setShowFolderModal(false)}>
                        <FiX />
                      </button>
                    </div>
                    <div className="modal-content">
                      <div className="form-group">
                        <label>Folder Name <span className="required">*</span></label>
                        <input id="folderName" type="text" placeholder="Enter folder name" />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button className="secondary-button" onClick={() => setShowFolderModal(false)}>Cancel</button>
                      <button className="primary-button" onClick={handleCreateFolder}>Create Folder</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showAddConversationModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add New Conversation</h3>
              <button className="close-button" onClick={() => setShowAddConversationModal(false)}>
                <FiX />
              </button>
            </div>
            <div className="modal-content">
              <form onSubmit={handleAddConversation}>
                <div className="form-group">
                  <label>Name <span className="required">*</span></label>
                  <input 
                    type="text" 
                    placeholder="Enter Name" 
                    value={newConversation.name}
                    onChange={(e) => setNewConversation({ ...newConversation, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email <span className="required">*</span></label>
                  <input 
                    type="email" 
                    placeholder="Enter Email" 
                    value={newConversation.email}
                    onChange={(e) => setNewConversation({ ...newConversation, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Contact <span className="required">*</span></label>
                  <input 
                    type="text" 
                    placeholder="Enter Contact" 
                    value={newConversation.contact}
                    onChange={(e) => setNewConversation({ ...newConversation, contact: e.target.value })}
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button className="secondary-button" onClick={() => setShowAddConversationModal(false)}>Cancel</button>
                  <button className="primary-button" type="submit">Add Conversation</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showFilterModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Filter Conversations</h3>
              <button className="close-button" onClick={() => setShowFilterModal(false)}>
                <FiX />
              </button>
            </div>
            <div className="modal-content">
              <div className="form-group">
                <label>
                  <input 
                    type="checkbox" 
                    checked={filterUnread} 
                    onChange={(e) => setFilterUnread(e.target.checked)} 
                  />
                  Unread
                </label>
              </div>
              <div className="form-group">
                <label>
                  <input 
                    type="checkbox" 
                    checked={filterStarred} 
                    onChange={(e) => setFilterStarred(e.target.checked)} 
                  />
                  Starred
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button className="secondary-button" onClick={() => setShowFilterModal(false)}>Cancel</button>
              <button className="primary-button" onClick={applyFilters}>Apply Filters</button>
            </div>
          </div>
        </div>
      )}

      {showAddLinkModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{editLink ? 'Edit Link' : 'Add New Link'}</h3>
              <button className="close-button" onClick={() => { setShowAddLinkModal(false); setEditLink(null); }}>
                <FiX />
              </button>
            </div>
            <div className="modal-content">
              <form onSubmit={editLink ? handleSaveLink : handleAddLink}>
                <div className="form-group">
                  <label>Name <span className="required">*</span></label>
                  <input 
                    type="text" 
                    placeholder="Enter Link Name" 
                    value={newLink.name}
                    onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Link URL <span className="required">*</span></label>
                  <input 
                    type="url" 
                    placeholder="Enter Link URL" 
                    value={newLink.url}
                    onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button className="secondary-button" onClick={() => { setShowAddLinkModal(false); setEditLink(null); }}>Cancel</button>
                  <button className="primary-button" type="submit">{editLink ? 'Save Changes' : 'Add Link'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showDeleteSuccess && (
        <div className="notification success">
          Snippet deleted successfully
        </div>
      )}
    </div>
  );
}

export default Conversation;