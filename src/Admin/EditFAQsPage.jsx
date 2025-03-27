import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { serverTimestamp } from "firebase/firestore";
import StatusModal from '../components/StatusModal';

const EditFAQsPage = () => {
  //modal
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);


  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [editingFaqId, setEditingFaqId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState(null);

  const handleNameChange = (e) => setName(e.target.value);
  const handleQuestionChange = (e) => setQuestion(e.target.value);
  const handleAnswerChange = (e) => setAnswer(e.target.value);

  const fetchFaqs = async () => {
    const querySnapshot = await getDocs(collection(firestore, 'faqs'));
    const faqsData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    setFaqs(faqsData);
  };

  const handleEditToggle = (faq) => {
    if (editingFaqId === faq.id) {
      setIsEditing(false);
      setEditingFaqId(null);
      setName("");
      setQuestion("");
      setAnswer("");
    } else {
      setIsEditing(true);
      setEditingFaqId(faq.id);
      setName(faq.name);
      setQuestion(faq.question);
      setAnswer(faq.answer);
      setShowAddForm(false);
    }
  };


  const handleSaveEdit = async () => {
    if (!question || !answer || !name) {
      setModalMessage("Please fill in all fields!");
      setIsSuccess(false);
      setShowModal(true);
      return;
    }

    try {
      const docRef = doc(firestore, 'faqs', editingFaqId);
      await updateDoc(docRef, {
        name,
        question,
        answer,
        timestamp: serverTimestamp()
      });

      setFaqs((prev) =>
        prev.map((faq) =>
          faq.id === editingFaqId
            ? { ...faq, name, question, answer }
            : faq
        )
      );

      setModalMessage("FAQ updated successfully!");
      setIsSuccess(true);
      setShowModal(true);


      setIsEditing(false);
      setEditingFaqId(null);
      setName("");
      setQuestion("");
      setAnswer("");
    } catch (e) {
      console.error("Error updating FAQ: ", e);
      setModalMessage("Error updating FAQ!");
      setIsSuccess(false);
      setShowModal(true);
    }
  };


  const handleSave = async () => {
    if (!question || !answer || !name) {
      setModalMessage("Please fill in all fields!");
      setIsSuccess(false);
      setShowModal(true);
      return;
    }
    
    try {
      if (editingFaqId) {
        await updateDoc(doc(firestore, 'faqs', editingFaqId), {
          name,
          question,
          answer,
          timestamp: serverTimestamp(),
        });
      } else {
        await addDoc(collection(firestore, 'faqs'), {
          name,
          question,
          answer,
          timestamp: serverTimestamp(),
        });
      }
      setModalMessage("FAQ saved successfully!");
      setIsSuccess(true);
      setShowModal(true);

      fetchFaqs();
      setShowAddForm(false);
      setIsEditing(false);
      setEditingFaqId(null);
      setName("");
      setQuestion("");
      setAnswer("");
    } catch (e) {
      console.error("Error saving FAQ: ", e);
      setModalMessage("Error saving FAQ!");
      setIsSuccess(false);
      setShowModal(true);
    }
  };

  const handleDelete = async () => {
    if (faqToDelete) {
      try {
        await deleteDoc(doc(firestore, 'faqs', faqToDelete));
        setModalMessage("FAQ deleted successfully!");
        setIsSuccess(true);
        setShowModal(true);
        fetchFaqs();
        setShowDeleteModal(false);
      } catch (e) {
        console.error("Error deleting document: ", e);
        setModalMessage("Error deleting FAQ!");
        setIsSuccess(false);
        setShowModal(true);
      }
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  return (
    <div className="bg-gray-100">
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-blue-700 mb-6">❓ Edit FAQs</h2>
          <button
            onClick={() => {
              setShowAddForm(!showAddForm);
              setEditingFaqId(null);
              setName("");
              setQuestion("");
              setAnswer("");
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors mt-6"
          >
            {showAddForm ? "Cancel New FAQ" : "Add New FAQ"}
          </button>


          {showAddForm && (
            <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-200 mt-6">
              <h3 className="text-3xl font-semibold text-gray-800 mb-4 text-center">{editingFaqId ? 'Edit FAQ' : 'Add New FAQ'}</h3>
              <label className="block text-lg font-medium text-gray-700">Title</label>
              <input type="text" value={name} onChange={handleNameChange} placeholder='Enter your name'
                className="w-full p-3 border rounded-lg bg-gray-50 mb-4" />
              <label className="block text-lg font-medium text-gray-700">Question</label>
              <input type="text" value={question} onChange={handleQuestionChange} placeholder='Add a question'
                className="w-full p-3 border rounded-lg bg-gray-50 mb-4" />
              <label className="block text-lg font-medium text-gray-700">Answer</label>
              <textarea value={answer} onChange={handleAnswerChange} placeholder='Enter answer'
                className="w-full p-3 border rounded-lg bg-gray-50 mb-4" rows="4" />
              <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700">
                {editingFaqId ? 'Update FAQ' : 'Save FAQ'}
              </button>
            </div>
          )}



            {showDeleteModal && (
              <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#000000a0] bg-opacity-0 z-40" />
              <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-md w-full z-50">
                  <h3 className="text-2xl font-semibold text-gray-800">Are you sure you want to delete this FAQ?</h3>
                  <div className="mt-6 flex justify-center space-x-4">
                    <button onClick={handleDelete} className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500">
                      Yes, Delete
                    </button>
                    <button onClick={() => setShowDeleteModal(false)} className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-500">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                  {editingFaqId === faq.id && isEditing ? (
                    <>
                      <input
                        type="text"
                        value={question}
                        onChange={handleQuestionChange}
                        className="text-2xl font-semibold text-gray-800 mt-2 w-full border-b-2"
                      />
                      
                      <textarea
                        value={answer}
                        onChange={handleAnswerChange}
                        className="w-full mt-2 p-2 border rounded-md"
                        rows="4"
                      />
                    </>
                  ) : (
                    <>
                      <h3 className="text-2xl font-semibold text-gray-800 mt-2">{faq.question}</h3>
                      <p className="text-gray-700 mt-2">{faq.answer}</p>
                      
                    </>
                  )}

                {showModal && (
                    <StatusModal
                      message={modalMessage}
                      isSuccess={isSuccess}
                      onClose={() => setShowModal(false)}
                    />
                  )}

                  <div className="mt-4">
                    <button
                      onClick={() => handleEditToggle(faq)}
                      className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 transition-colors"
                    >
                      {isEditing && editingFaqId === faq.id ? 'Cancel Edit' : 'Edit'}
                    </button>

                    {isEditing && editingFaqId === faq.id && (
                      <button
                        onClick={handleSaveEdit}
                        className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors"
                      >
                        Save
                      </button>
                    )}

                    <button
                      onClick={() => { setShowDeleteModal(true); setFaqToDelete(faq.id); }}
                      className="ml-4 bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditFAQsPage;
