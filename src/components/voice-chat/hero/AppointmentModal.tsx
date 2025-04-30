import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format, addDays } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar, X } from 'lucide-react';

interface AppointmentModalProps {
  onClose: () => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Generate next 5 available days
  const availableDates = Array.from({ length: 5 }, (_, i) => addDays(new Date(), i + 1));

  // Generate time slots
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-x-0 bottom-0 bg-gray-900/95 backdrop-blur-xl rounded-t-2xl shadow-2xl border-t border-purple-500/20"
      aria-label="Schedule appointment modal"
    >
      <div className="max-w-lg mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Schedule Your Demo
          </h3>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-gray-400 hover:text-white hover:bg-gray-800/50"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Date Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Select a Date
          </label>
          <div className="grid grid-cols-5 gap-2">
            {availableDates.map((date) => (
              <Button
                key={date.toISOString()}
                variant="outline"
                className={`p-3 h-auto border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-500/10 ${
                  selectedDate?.toDateString() === date.toDateString()
                    ? 'bg-purple-500/20 border-purple-500/40'
                    : 'bg-gray-800/50'
                }`}
                onClick={() => setSelectedDate(date)}
              >
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-300">
                    {format(date, 'EEE')}
                  </div>
                  <div className="text-sm text-gray-400">
                    {format(date, 'd')}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Select a Time
            </label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant="outline"
                  className={`border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-500/10 ${
                    selectedTime === time
                      ? 'bg-purple-500/20 border-purple-500/40'
                      : 'bg-gray-800/50'
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  <span className="text-gray-300">{time}</span>
                </Button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Confirm Button */}
        {selectedDate && selectedTime && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-500/25"
              onClick={onClose}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Confirm Appointment
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
