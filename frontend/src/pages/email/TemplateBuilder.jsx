import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus, Layout, Type, Image, Donut as ButtonIcon, Link as LinkIcon, Save, Code, Upload, Menu, X } from 'lucide-react';
import Editor from '@monaco-editor/react';

const ELEMENTS = [
  { id: 'heading', icon: Type, label: 'Heading', defaultContent: 'New Heading', defaultStyle: { fontSize: '24px', fontWeight: 'bold' } },
  { id: 'text', icon: Type, label: 'Text Block', defaultContent: 'Add your text here', defaultStyle: { fontSize: '16px' } },
  { id: 'image', icon: Image, label: 'Image', defaultContent: 'https://via.placeholder.com/400x200', defaultStyle: { width: '100%', maxWidth: '400px' } },
  { id: 'button', icon: ButtonIcon, label: 'Button', defaultContent: 'Click Me', defaultStyle: { padding: '10px 20px', backgroundColor: '#3B82F6', color: 'white', borderRadius: '6px', display: 'inline-block' } },
  { id: 'divider', icon: Layout, label: 'Divider', defaultContent: '', defaultStyle: { borderTop: '1px solid #e5e7eb', margin: '20px 0' } },
  { id: 'spacer', icon: Layout, label: 'Spacer', defaultContent: '', defaultStyle: { height: '40px' } },
];

function TemplateBuilder() {
  const [templateName, setTemplateName] = useState('');
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [showCssEditor, setShowCssEditor] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importCode, setImportCode] = useState('');
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);
  const [showRightSidebar, setShowRightSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setShowLeftSidebar(false);
        setShowRightSidebar(false);
      } else {
        setShowLeftSidebar(true);
        setShowRightSidebar(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const sourceId = result.source.droppableId;
    const destId = result.destination.droppableId;

    if (sourceId === 'elements' && destId === 'canvas') {
      // Adding new element from sidebar to canvas
      const elementType = ELEMENTS[result.source.index];
      const newElement = {
        id: `${elementType.id}-${Date.now()}`,
        type: elementType.id,
        content: elementType.defaultContent,
        style: { ...elementType.defaultStyle },
        customCss: ''
      };
      const newElements = [...elements];
      newElements.splice(result.destination.index, 0, newElement);
      setElements(newElements);
    } else if (sourceId === 'canvas' && destId === 'canvas') {
      // Reordering within canvas
      const items = Array.from(elements);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setElements(items);
    }
  };

  const addElement = (type) => {
    const elementType = ELEMENTS.find(el => el.id === type);
    const newElement = {
      id: `${type}-${Date.now()}`,
      type,
      content: elementType.defaultContent,
      style: { ...elementType.defaultStyle },
      customCss: ''
    };
    setElements([...elements, newElement]);
    if (isMobile) {
      setShowLeftSidebar(false);
      setShowRightSidebar(true);
      setSelectedElement(newElement);
    }
  };

  const updateElementStyle = (property, value) => {
    if (!selectedElement) return;
    
    const updated = elements.map(el =>
      el.id === selectedElement.id
        ? { ...el, style: { ...el.style, [property]: value } }
        : el
    );
    setElements(updated);
    setSelectedElement(updated.find(el => el.id === selectedElement.id));
  };

  const updateElementCustomCss = (css) => {
    if (!selectedElement) return;
    
    const updated = elements.map(el =>
      el.id === selectedElement.id
        ? { ...el, customCss: css }
        : el
    );
    setElements(updated);
    setSelectedElement(updated.find(el => el.id === selectedElement.id));
  };

  const handleImportTemplate = () => {
    try {
      const importedTemplate = JSON.parse(importCode);
      if (importedTemplate.elements && Array.isArray(importedTemplate.elements)) {
        setElements(importedTemplate.elements);
        setTemplateName(importedTemplate.name || '');
        setShowImportModal(false);
        setImportCode('');
      }
    } catch (error) {
      alert('Invalid template code. Please check the format and try again.');
    }
  };

  const handleSaveTemplate = () => {
    if (!templateName.trim()) {
      alert('Please enter a template name before exporting.');
      return;
    }

    const template = {
      name: templateName,
      elements,
      createdAt: new Date().toISOString()
    };
    
    const templateCode = JSON.stringify(template, null, 2);
    
    const blob = new Blob([templateCode], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${templateName || 'template'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderElement = (element) => {
    const combinedStyle = {
      ...element.style
    };

    if (element.customCss) {
      try {
        const cssProperties = element.customCss.split(';')
          .filter(prop => prop.trim())
          .reduce((acc, prop) => {
            const [key, value] = prop.split(':').map(str => str.trim());
            if (key && value) {
              const camelKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
              acc[camelKey] = value;
            }
            return acc;
          }, {});
        Object.assign(combinedStyle, cssProperties);
      } catch (error) {
        console.error('Error parsing custom CSS:', error);
      }
    }

    switch (element.type) {
      case 'heading':
      case 'text':
        return <div style={combinedStyle}>{element.content}</div>;
      case 'image':
        return <img src={element.content} alt="Template" style={combinedStyle} />;
      case 'button':
        return <button style={combinedStyle}>{element.content}</button>;
      case 'divider':
        return <hr style={combinedStyle} />;
      case 'spacer':
        return <div style={combinedStyle}></div>;
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col md:flex-row relative">
      {/* Mobile Header */}
      {isMobile && (
        <div className="bg-gray-800 p-4 flex justify-between items-center">
          <button
            onClick={() => setShowLeftSidebar(!showLeftSidebar)}
            className="p-2 hover:bg-gray-700 rounded-lg"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold">Template Builder</h1>
          <button
            onClick={() => {
              setShowRightSidebar(!showRightSidebar);
              if (!showRightSidebar && !selectedElement) {
                alert('Select an element first to edit properties');
                setShowRightSidebar(false);
              }
            }}
            className="p-2 hover:bg-gray-700 rounded-lg"
          >
            <Code className="h-6 w-6" />
          </button>
        </div>
      )}

      {/* Left Sidebar - Elements */}
      <div className={`${
        showLeftSidebar ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-200 fixed md:relative z-30 md:translate-x-0 w-64 h-full bg-gray-800 border-r border-gray-700`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Elements</h2>
            {isMobile && (
              <button
                onClick={() => setShowLeftSidebar(false)}
                className="p-2 hover:bg-gray-700 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="elements" type="elements">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="grid grid-cols-2 gap-2"
                >
                  {ELEMENTS.map((element, index) => (
                    <Draggable
                      key={element.id}
                      draggableId={element.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex flex-col items-center justify-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-move"
                          onClick={() => addElement(element.id)}
                        >
                          <element.icon className="h-6 w-6 mb-2" />
                          <span className="text-sm">{element.label}</span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>

      {/* Main Content - Canvas */}
      <div className="flex-1 bg-gray-900 p-4 md:p-8 overflow-auto">
        <div className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="Template Name"
              className="w-full md:w-auto bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={() => setShowImportModal(true)}
              className="w-full md:w-auto flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Upload className="h-5 w-5 mr-2" />
              Import
            </button>
          </div>
          <button 
            onClick={handleSaveTemplate}
            className="w-full md:w-auto flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            <Save className="h-5 w-5 mr-2" />
            Export Template
          </button>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="bg-white rounded-lg p-4 md:p-8 min-h-[600px]">
            <Droppable droppableId="canvas">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="min-h-full"
                >
                  {elements.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg">
                      <Plus className="h-12 w-12 text-gray-400 mb-2" />
                      <p className="text-gray-500 text-center">Drag elements here or click an element to add</p>
                    </div>
                  ) : (
                    elements.map((element, index) => (
                      <Draggable key={element.id} draggableId={element.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`relative bg-gray-50 p-4 mb-4 rounded cursor-move group ${
                              selectedElement?.id === element.id ? 'ring-2 ring-blue-500' : ''
                            }`}
                            onClick={() => {
                              setSelectedElement(element);
                              if (isMobile) {
                                setShowRightSidebar(true);
                              }
                            }}
                          >
                            {renderElement(element)}
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (selectedElement?.id === element.id) {
                                    setSelectedElement(null);
                                  }
                                  setElements(elements.filter(el => el.id !== element.id));
                                }}
                                className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </div>

      {/* Right Sidebar - Properties */}
      <div className={`${
        showRightSidebar ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-200 fixed md:relative right-0 top-0 z-30 md:translate-x-0 w-full md:w-80 h-full bg-gray-800 border-l border-gray-700 overflow-auto`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Properties</h2>
            {isMobile && (
              <button
                onClick={() => setShowRightSidebar(false)}
                className="p-2 hover:bg-gray-700 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {selectedElement ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium">Element Type: {selectedElement.type}</span>
                <button
                  onClick={() => setShowCssEditor(!showCssEditor)}
                  className="flex items-center text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg"
                >
                  <Code className="h-4 w-4 mr-1" />
                  {showCssEditor ? 'Basic Editor' : 'CSS Editor'}
                </button>
              </div>

              {showCssEditor ? (
                <div className="h-[500px] bg-gray-900 rounded-lg overflow-hidden">
                  <Editor
                    height="100%"
                    defaultLanguage="css"
                    theme="vs-dark"
                    value={selectedElement.customCss}
                    onChange={(value) => updateElementCustomCss(value || '')}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: 'off',
                    }}
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Content</label>
                    <input
                      type="text"
                      value={selectedElement.content}
                      onChange={(e) => {
                        const updated = elements.map(el =>
                          el.id === selectedElement.id
                            ? { ...el, content: e.target.value }
                            : el
                        );
                        setElements(updated);
                        setSelectedElement(updated.find(el => el.id === selectedElement.id));
                      }}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                    />
                  </div>
                  
                  {selectedElement.type !== 'divider' && selectedElement.type !== 'spacer' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-1">Font Size</label>
                        <input
                          type="text"
                          value={selectedElement.style.fontSize || '16px'}
                          onChange={(e) => updateElementStyle('fontSize', e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                        />
                      </div>
                      
                      {selectedElement.type === 'button' && (
                        <>
                          <div>
                            <label className="block text-sm font-medium mb-1">Background Color</label>
                            <input
                              type="color"
                              value={selectedElement.style.backgroundColor || '#3B82F6'}
                              onChange={(e) => updateElementStyle('backgroundColor', e.target.value)}
                              className="w-full h-10 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Text Color</label>
                            <input
                              type="color"
                              value={selectedElement.style.color || '#FFFFFF'}
                              onChange={(e) => updateElementStyle('color', e.target.value)}
                              className="w-full h-10 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                            />
                          </div>
                        </>
                      )}
                    </>
                  )}
                  
                  {selectedElement.type === 'spacer' && (
                    <div>
                      <label className="block text-sm font-medium mb-1">Height</label>
                      <input
                        type="text"
                        value={selectedElement.style.height || '40px'}
                        onChange={(e) => updateElementStyle('height', e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                      />
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-400">Select an element to edit its properties</p>
          )}
        </div>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-[600px]">
            <h3 className="text-xl font-semibold mb-4">Import Template</h3>
            <div className="mb-4">
              <textarea
                value={importCode}
                onChange={(e) => setImportCode(e.target.value)}
                placeholder="Paste your template code here..."
                className="w-full h-64 bg-gray-700 border border-gray-600 rounded-lg p-4 text-sm font-mono"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleImportTemplate}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                Import
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TemplateBuilder;