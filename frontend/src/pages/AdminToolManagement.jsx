import { useState, useEffect } from 'react';
import { LayoutDashboard, Tractor, Calendar, LogOut, User, Plus, Trash2, Upload, Edit, MapPin } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const AdminToolManagement = () => {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTool, setNewTool] = useState({ 
    owner_id: 1, name: '', category: '', price_hour: '', price_day: '', description: '', image: '', location: ''
  });
  const [editingToolId, setEditingToolId] = useState(null);
  
  const [toolsList, setToolsList] = useState([]);

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tools');
      setToolsList(response.data);
    } catch (error) {
      console.error("Error fetching tools:", error);
    }
  };

  const handleLogout = () => {
    navigate('/admin-login');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewTool({ ...newTool, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const submitNewTool = async () => {
    if (!newTool.name || !newTool.category || !newTool.price_hour || !newTool.location || !newTool.image) {
      alert("કૃપા કરીને વિશેષતા સિવાય તમામ જરૂરી માહિતી (નામ, શ્રેણી, ભાડું, સરનામું અને ફોટો) ફરજિયાત ભરો.");
      return;
    }
    
    try {
      if (editingToolId) {
        // Edit Mode
        await axios.put(`http://localhost:5000/api/tools/${editingToolId}`, newTool);
      } else {
        // Add Mode
        await axios.post('http://localhost:5000/api/tools', newTool);
      }
      
      // reset form
      setNewTool({ owner_id: 1, name: '', category: '', price_hour: '', price_day: '', description: '', image: '', location: '' });
      setShowAddForm(false);
      setEditingToolId(null);
      fetchTools(); // Refresh the grid
    } catch (error) {
      console.error('Error submitting tool:', error);
    }
  };

  const handleDelete = async (idToRemove) => {
    if (window.confirm("સુનિશ્ચિત કરો કે તમે આ સાધન કાઢી નાખવા માંગો છો?")) {
      try {
        await axios.delete(`http://localhost:5000/api/tools/${idToRemove}`);
        fetchTools();
      } catch (error) {
        console.error("Error deleting tool", error);
      }
    }
  };

  const handleEdit = (tool) => {
    setNewTool({
      owner_id: tool.owner_id || 1,
      name: tool.name,
      category: tool.category,
      price_hour: tool.price_hour,
      price_day: tool.price_day || tool.price_hour * 10,
      description: tool.description,
      image: tool.image,
      location: tool.location || ''
    });
    setEditingToolId(tool.id);
    setShowAddForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex font-sans bg-gray-50">
      
      {/* Sidebar */}
      <aside className="w-[280px] bg-[var(--color-brand-green)] text-white flex flex-col fixed h-full z-10 shadow-xl">
        <div className="p-6 border-b border-green-600/50 flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0">
            <Tractor className="text-[var(--color-brand-green)]" size={30} />
          </div>
          <span className="font-bold text-2xl tracking-wide">એડમિન પેનલ</span>
        </div>

        <nav className="flex-1 py-8 flex flex-col gap-2 px-4">
          <Link to="/admin-dashboard" className="flex items-center gap-3 text-white/80 hover:bg-green-800/50 hover:text-white px-5 py-3.5 rounded-lg font-medium text-lg cursor-pointer transition-colors">
            <LayoutDashboard size={24} />
            ડેશબોર્ડ
          </Link>
          
          <div className="flex items-center gap-3 bg-[var(--color-brand-yellow)] text-[var(--color-brand-green)] px-5 py-3.5 rounded-lg font-bold text-lg shadow-md cursor-default">
            <Tractor size={24} />
            સાધનો સંચાલન
          </div>

          <Link to="/admin-bookings" className="flex items-center gap-3 text-white/80 hover:bg-green-800/50 hover:text-white px-5 py-3.5 rounded-lg font-medium text-lg cursor-pointer transition-colors">
            <Calendar size={24} />
            બુકિંગ સંચાલન
          </Link>
        </nav>

        <div className="p-6 border-t border-green-600/50">
          <button onClick={handleLogout} className="flex items-center gap-3 text-white/90 hover:text-white font-bold text-xl cursor-pointer w-full">
            <LogOut size={26} className="text-red-400 rotate-180" />
            લૉગઆઉટ
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-[280px] flex flex-col min-h-screen">
        
        <header className="bg-white h-24 shadow-sm border-b border-gray-200 px-10 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">સાધનો સંચાલન</h1>
          <div className="flex items-center gap-4 border border-gray-100 p-2 pr-4 rounded-full bg-gray-50/50 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer">
            <div className="flex flex-col items-end pl-2">
              <span className="font-bold text-gray-800 text-[15px]">Admin Access</span>
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">એડમિન</span>
            </div>
            <div className="w-12 h-12 bg-[var(--color-brand-green)] rounded-full flex items-center justify-center text-white shadow-inner">
              <User size={26} />
            </div>
          </div>
        </header>

        <main className="p-10 flex-grow bg-slate-50 relative">
          <div className="w-full max-w-5xl mx-auto">
            
            <div className="flex justify-end mb-6">
              <button 
                onClick={() => {
                  setEditingToolId(null);
                  setNewTool({ owner_id: 1, name: '', category: '', price_hour: '', price_day: '', description: '', image: '', location: 'રાજકોટ', is_popular: false });
                  setShowAddForm(!showAddForm);
                }}
                className="flex items-center gap-2 bg-[#008000] hover:bg-green-800 text-white font-medium text-lg px-6 py-3 rounded-md shadow-md transition-colors"
              >
                <Plus size={22} strokeWidth={2.5} />
                નવું સાધન ઉમેરો
              </button>
            </div>

            {showAddForm && (
              <div className="bg-[#f8f9fa] rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-xl font-extrabold text-[#1a1a1a] mb-6">{editingToolId ? 'સાધન મહિતી અપડેટ કરો' : 'નવું સાધન ઉમેરો'}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-600 font-semibold text-sm">સાધન નામ</label>
                    <input 
                      type="text" 
                      value={newTool.name}
                      onChange={(e) => setNewTool({...newTool, name: e.target.value})}
                      className="border border-gray-300 rounded md p-2.5 focus:outline-none focus:border-green-600"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-600 font-semibold text-sm">શ્રેણી (Category)</label>
                    <select 
                      value={newTool.category}
                      onChange={(e) => setNewTool({...newTool, category: e.target.value})}
                      className="border border-gray-300 rounded md p-2.5 focus:outline-none focus:border-green-600 bg-white cursor-pointer"
                    >
                      <option value="">-- પસંદ કરો --</option>
                      <option value="ટ્રેક્ટર">ટ્રેક્ટર (Tractor)</option>
                      <option value="વાવણી સાધન">વાવણી સાધન (Sowing)</option>
                      <option value="થ્રેશર">થ્રેશર (Thresher)</option>
                      <option value="કાપણી સાધન">કાપણી સાધન (Pruning)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-gray-600 font-semibold text-sm">ભાડું(પ્રતિ કલાક)</label>
                    <input 
                      type="number" 
                      min="0"
                      value={newTool.price_hour}
                      onChange={(e) => setNewTool({...newTool, price_hour: e.target.value})}
                      className="border border-gray-300 rounded md p-2.5 focus:outline-none focus:border-green-600"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-600 font-semibold text-sm">ગામ / સરનામું</label>
                    <input 
                      type="text" 
                      value={newTool.location}
                      onChange={(e) => setNewTool({...newTool, location: e.target.value})}
                      className="border border-gray-300 rounded md p-2.5 focus:outline-none focus:border-green-600"
                    />
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-gray-600 font-semibold text-sm">વિશેષતા (Description)</label>
                    <textarea 
                      value={newTool.description}
                      onChange={(e) => setNewTool({...newTool, description: e.target.value})}
                      className="border border-gray-300 rounded md p-2.5 focus:outline-none focus:border-green-600"
                      rows="3"
                    ></textarea>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-600 font-semibold text-sm">ફોટો ઉમેરો</label>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 border border-gray-300 bg-white rounded cursor-pointer px-4 py-2 hover:bg-gray-50 transition-colors text-sm font-semibold">
                        <Upload size={16} /> ફોટો ઉમેરો
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                      {newTool.image && (
                        <div className="w-16 h-10 bg-gray-100 rounded overflow-hidden shadow-sm border border-gray-200">
                          <img src={newTool.image} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                  


                </div>

                <div className="flex justify-end items-center gap-6 mt-8">
                  <button onClick={() => { setShowAddForm(false); setEditingToolId(null); }} className="text-[#008000] font-bold hover:text-green-800 transition-colors">
                    રદ કરો
                  </button>
                  <button onClick={submitNewTool} className="bg-[#008000] hover:bg-green-800 text-white font-bold px-6 py-2 rounded transition-colors shadow-sm">
                    {editingToolId ? 'અપડેટ કરો' : 'ઉમેરો'}
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-[80px_100px_minmax(180px,2.5fr)_1.2fr_1.5fr_1.2fr_100px] gap-4 bg-[#f4f4f4] border-b border-gray-200 p-4 text-gray-500 font-semibold text-lg text-center">
                <div className="text-left pl-4">ID</div>
                <div>ફોટો</div>
                <div className="text-left">નામ</div>
                <div>શ્રેણી</div>
                <div>સ્થાન</div>
                <div>ભાડું(કલાક)</div>
                <div>ક્રિયા</div>
              </div>

              <div className="divide-y divide-gray-200">
                {toolsList.map((tool) => (
                  <div key={tool.id} className="grid grid-cols-[80px_100px_minmax(180px,2.5fr)_1.2fr_1.5fr_1.2fr_100px] gap-4 items-center p-4 text-center hover:bg-gray-50 transition-colors">
                    <div className="text-left pl-4 font-semibold text-gray-500 text-lg">#{tool.id}</div>
                    <div className="flex justify-center">
                      <div className="w-16 h-12 bg-gray-100 rounded overflow-hidden shadow-sm border border-gray-100">
                        <img src={tool.image} alt={tool.name} className="w-full h-full object-cover mix-blend-multiply" />
                      </div>
                    </div>
                    <div className="text-left flex flex-col justify-center gap-0.5">
                      <span className="font-bold text-gray-900 text-[17px]">{tool.name}</span>
                      {tool.description && (
                        <span className="text-gray-500 text-[12px] font-medium leading-tight line-clamp-2 pr-2" title={tool.description}>
                          {tool.description}
                        </span>
                      )}
                    </div>
                    <div className="text-gray-500 font-medium">{tool.category}</div>
                    <div className="flex items-center justify-center gap-1.5 text-gray-600 font-medium whitespace-nowrap"><MapPin size={16} className="text-red-500" />{tool.location || 'N/A'}</div>
                    <div className="text-gray-500 font-medium font-bold text-green-700">₹{tool.price_hour}</div>
                    
                    <div className="flex justify-center gap-2 items-center">
                      <div onClick={() => handleEdit(tool)} className="cursor-pointer hover:bg-blue-50 p-2 rounded-full transition-colors">
                        <Edit className="text-blue-500" size={24} />
                      </div>
                      <div onClick={() => handleDelete(tool.id)} className="cursor-pointer hover:bg-red-50 p-2 rounded-full transition-colors">
                        <Trash2 className="text-red-600" size={24} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminToolManagement;
