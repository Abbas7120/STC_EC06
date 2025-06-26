

  return (
    <div className="space-y-6">
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <p className="text-green-800 font-medium">ID Card generated and downloaded successfully!</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Generate ID Card</h2>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <select
              value={selectedTrainee}
              onChange={(e) => setSelectedTrainee(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a trainee...</option>
              {myTrainees.map((trainee) => (
                <option key={trainee.id} value={trainee.id}>
                  {trainee.fullName} - {trainee.id} ({trainee.moduleNumber})
                </option>
              ))}
            </select>
          </div>
          {selectedTraineeData && (
            <button
              onClick={generateIDCard}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Generate ID Card
            </button>
          )}
        </div>
      </div>

      {selectedTraineeData && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">ID Card Preview</h3>
          <div className="id-card-preview border border-blue-800 rounded-lg p-4 text-blue-900 bg-blue-50 max-w-sm mx-auto text-center">
            <img src="/images/STC logo.png" alt="STC Logo" className="w-20 h-20 mx-auto mb-2" />
            <p className="font-bold">STC LUCKNOW | IDENTITY CARD</p>
            <hr className="my-2" />
            <p><strong>Name:</strong> {selectedTraineeData.fullName}</p>
            <p><strong>ID:</strong> {selectedTraineeData.id}</p>
            <p><strong>Module:</strong> {selectedTraineeData.moduleNumber}</p>
            <p><strong>Designation:</strong> {selectedTraineeData.designation}</p>
            <p><strong>Course Duration:</strong> {selectedTraineeData.courseDuration}</p>
            <p><strong>Email:</strong> {selectedTraineeData.email}</p>
            <p><strong>Phone:</strong> {selectedTraineeData.phoneNumber}</p>
            <p><strong>Unit:</strong> {selectedTraineeData.unit}</p>
            <p><strong>Batch:</strong> {selectedTraineeData.batch}</p>
            <p className="text-xs text-center mt-4">Generated on: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </div>
  );
}
