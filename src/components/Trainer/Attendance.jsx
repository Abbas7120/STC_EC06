import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../context/DataContext';

const Attendance = () => {
  const { trainees } = useContext(DataContext);

  const [attendance, setAttendance] = useState(() => {
    const stored = localStorage.getItem('stc_attendance');
    return stored ? JSON.parse(stored) : {};
  });

  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [summaryModal, setSummaryModal] = useState({ open: false, trainee: null });

  const currentYear = new Date().getFullYear();
  const currentMonth = selectedDate.slice(0, 7); // YYYY-MM

  // Sync attendance to localStorage
  useEffect(() => {
    localStorage.setItem('stc_attendance', JSON.stringify(attendance));
  }, [attendance]);

  // Cleanup attendance of deleted trainees
  useEffect(() => {
    const updatedAttendance = {};
    trainees.forEach(t => {
      if (attendance[t.id]) {
        updatedAttendance[t.id] = attendance[t.id];
      }
    });
    setAttendance(updatedAttendance);
  }, [trainees]);

  const markAttendance = (traineeId, status) => {
    setAttendance((prev) => {
      const updated = { ...prev };
      if (!updated[traineeId]) updated[traineeId] = [];

      const alreadyMarked = updated[traineeId].some((r) => r.date === selectedDate);
      if (!alreadyMarked) {
        updated[traineeId].push({ date: selectedDate, status });
      }
      return updated;
    });
  };

  const getStatus = (id) => {
    const records = attendance[id] || [];
    const record = records.find((r) => r.date === selectedDate);
    return record ? record.status : 'Not Marked';
  };

  const countPresent = (id, scope) => {
    const records = attendance[id] || [];
    return records.filter((r) => {
      if (r.status !== 'Present') return false;
      if (scope === 'month') return r.date.startsWith(currentMonth);
      if (scope === 'year') return r.date.startsWith(`${currentYear}`);
      return false;
    }).length;
  };

  const getSummary = (id) => {
    const records = attendance[id] || [];
    return [...records].sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const renderCalendarSummary = (records) => {
    const daysInMonth = new Date(currentYear, new Date(selectedDate).getMonth() + 1, 0).getDate();
    const recordMap = new Map(records.map((r) => [r.date, r.status]));
    const dates = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const dateStr = `${currentMonth}-${String(day).padStart(2, '0')}`;
      const status = recordMap.get(dateStr);

      return (
        <div
          key={dateStr}
          className={`text-center rounded-lg py-2 text-sm font-medium shadow-sm ${
            status === 'Present'
              ? 'bg-green-500 text-white'
              : status === 'Absent'
              ? 'bg-red-500 text-white'
              : 'bg-gray-100 text-gray-400'
          }`}
        >
          {day}
        </div>
      );
    });

    return <div className="grid grid-cols-7 gap-2 p-2">{dates}</div>;
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Attendance - {selectedDate}</h2>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded-md px-3 py-1.5 text-sm text-gray-700 shadow-sm"
          />
        </div>

        {trainees.length === 0 ? (
          <p className="text-gray-500">No trainees found. Please add trainees first.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm text-gray-800">
              <thead className="bg-gray-50 text-left text-sm font-semibold text-gray-700">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Trainee ID</th>
                  <th className="px-4 py-3">Module</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Mark Attendance</th>
                  <th className="px-4 py-3 text-center">Month Total</th>
                  <th className="px-4 py-3 text-center">Year Total</th>
                </tr>
              </thead>
              <tbody>
                {trainees.map((trainee) => {
                  const status = getStatus(trainee.id);
                  const alreadyMarked = status !== 'Not Marked';

                  return (
                    <tr key={trainee.id} className="border-b last:border-none hover:bg-gray-50">
                      <td
                        className="px-4 py-3 font-medium text-blue-600 cursor-pointer"
                        onClick={() => setSummaryModal({ open: true, trainee })}
                      >
                        {trainee.fullName || 'N/A'}
                      </td>
                      <td className="px-4 py-3">{trainee.id}</td>
                      <td className="px-4 py-3">{trainee.moduleNumber || 'N/A'}</td>
                      <td className="px-4 py-3">{status}</td>
                      <td className="px-4 py-3 flex gap-2">
                        <button
                          onClick={() => markAttendance(trainee.id, 'Present')}
                          className="text-white bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-md text-sm disabled:opacity-50 cursor-pointer"
                          disabled={alreadyMarked}
                          title="Mark Present"
                        >
                          Present
                        </button>
                        <button
                          onClick={() => markAttendance(trainee.id, 'Absent')}
                          className="text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-md text-sm disabled:opacity-50 cursor-pointer"
                          disabled={alreadyMarked}
                          title="Mark Absent"
                        >
                          Absent
                        </button>
                      </td>
                      <td className="px-4 py-3 text-center">{countPresent(trainee.id, 'month')}</td>
                      <td className="px-4 py-3 text-center">{countPresent(trainee.id, 'year')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Calendar Summary Modal */}
      {summaryModal.open && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-1">
              Attendance Summary – {summaryModal.trainee?.fullName || 'Trainee'}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {new Date(selectedDate).toLocaleString('default', { month: 'long', year: 'numeric' })}
            </p>
            <div className="border rounded-lg p-4">
              {renderCalendarSummary(getSummary(summaryModal.trainee?.id))}
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={() => setSummaryModal({ open: false, trainee: null })}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
