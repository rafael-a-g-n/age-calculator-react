import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { differenceInYears, differenceInMonths, differenceInDays, parse } from 'date-fns';

function App() {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState(null);
  const [error, setError] = useState('');

  const calculateAge = () => {
    if (!birthDate) {
      setError('Please select a date');
      setAge(null);
      return;
    }

    try {
      const parsedDate = parse(birthDate, 'yyyy-MM-dd', new Date());
      const today = new Date();

      if (isNaN(parsedDate.getTime())) {
        setError('Please enter a valid date');
        setAge(null);
        return;
      }

      if (parsedDate > today) {
        setError('Birth date cannot be in the future');
        setAge(null);
        return;
      }

      const years = differenceInYears(today, parsedDate);
      const months = differenceInMonths(today, parsedDate) % 12;
      const days = differenceInDays(today, parsedDate) % 30;

      setAge({ years, months, days });
      setError('');
    } catch (err) {
      setError('Please enter a valid date');
      setAge(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Age Calculator
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter your birth date
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={calculateAge}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
          >
            Calculate Age
          </motion.button>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-500 text-center"
              >
                {error}
              </motion.div>
            )}

            {age && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-gray-50 rounded-xl p-6 space-y-4"
              >
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
                  Your Age is
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-white p-4 rounded-lg shadow text-center"
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="block text-3xl font-bold text-purple-600"
                    >
                      {age.years}
                    </motion.span>
                    <span className="text-gray-600">Years</span>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white p-4 rounded-lg shadow text-center"
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="block text-3xl font-bold text-blue-600"
                    >
                      {age.months}
                    </motion.span>
                    <span className="text-gray-600">Months</span>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-4 rounded-lg shadow text-center"
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="block text-3xl font-bold text-indigo-600"
                    >
                      {age.days}
                    </motion.span>
                    <span className="text-gray-600">Days</span>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default App;