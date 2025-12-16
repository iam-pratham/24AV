import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface CustomDatePickerProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (date: Date) => void;
  initialDate?: Date;
  maximumDate?: Date;
  minimumDate?: Date;
}

export default function CustomDatePicker({
  visible,
  onClose,
  onSelect,
  initialDate = new Date(),
  maximumDate,
  minimumDate,
}: CustomDatePickerProps) {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
  const [viewMode, setViewMode] = useState<'date' | 'month' | 'year'>('date');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const monthAbbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return (firstDay.getDay() + 6) % 7; // Convert Sunday (0) to be last (6)
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const navigateYear = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setFullYear(newDate.getFullYear() - 1);
    } else {
      newDate.setFullYear(newDate.getFullYear() + 1);
    }
    setCurrentDate(newDate);
  };

  const selectDate = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
  };

  const selectMonth = (month: number) => {
    const newDate = new Date(currentDate.getFullYear(), month, 1);
    setCurrentDate(newDate);
    setViewMode('date');
  };

  const selectYear = (year: number) => {
    const newDate = new Date(year, currentDate.getMonth(), 1);
    setCurrentDate(newDate);
    setViewMode('month');
  };

  const renderYearGrid = () => {
    const currentYear = currentDate.getFullYear();
    const startYear = Math.floor(currentYear / 10) * 10; // Get decade start (e.g., 2020 for 2022)
    const years: number[] = [];
    
    for (let i = 0; i < 12; i++) {
      years.push(startYear - 2 + i);
    }

    return years.map((year) => {
      const isSelected = currentDate.getFullYear() === year;
      return (
        <TouchableOpacity
          key={year}
          style={[styles.yearCell, isSelected && styles.selectedYear]}
          onPress={() => selectYear(year)}
        >
          <Text style={[styles.yearText, isSelected && styles.selectedYearText]}>
            {year}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  const handleSelect = () => {
    if (selectedDate) {
      onSelect(selectedDate);
      onClose();
    }
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days: (number | null)[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    // Add empty cells to fill the last row
    while (days.length % 7 !== 0) {
      days.push(null);
    }

    return days.map((day, index) => {
      if (day === null) {
        return <View key={index} style={styles.calendarDay} />;
      }

      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isSelected = selectedDate && 
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear();

      const isToday = new Date().toDateString() === date.toDateString();

      return (
        <TouchableOpacity
          key={index}
          style={[styles.calendarDay, isSelected && styles.selectedDay]}
          onPress={() => selectDate(day)}
        >
          <Text style={[styles.dayText, isSelected && styles.selectedDayText, isToday && !isSelected && styles.todayText]}>
            {day}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  const renderMonthGrid = () => {
    return monthAbbr.map((month, index) => {
      const isSelected = currentDate.getMonth() === index;
      return (
        <TouchableOpacity
          key={index}
          style={[styles.monthCell, isSelected && styles.selectedMonth]}
          onPress={() => selectMonth(index)}
        >
          <Text style={[styles.monthText, isSelected && styles.selectedMonthText]}>
            {month}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  const formatDate = (date: Date) => {
    return `${months[date.getMonth()].toUpperCase()} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const formatMonthYear = (date: Date) => {
    return `${months[date.getMonth()].toUpperCase()}, ${date.getFullYear()}`;
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <TouchableOpacity 
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity 
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
          style={styles.containerWrapper}
        >
          <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {viewMode === 'date' ? 'Select Date' : viewMode === 'month' ? 'Select Month' : 'Select Year'}
            </Text>
            <Text style={styles.subtitle}>
              {viewMode === 'date' 
                ? formatDate(selectedDate || currentDate)
                : viewMode === 'month'
                ? formatMonthYear(currentDate)
                : currentDate.getFullYear().toString()
              }
            </Text>
          </View>

          {viewMode === 'date' ? (
            <>
              {/* Month Navigation */}
              <View style={styles.navigation}>
                <TouchableOpacity onPress={() => navigateMonth('prev')}>
                  <MaterialIcons name="chevron-left" size={24} color="#0D1634" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.monthYearButton}
                  onPress={() => setViewMode('month')}
                >
                  <Text style={styles.monthYearText}>
                    {months[currentDate.getMonth()].substring(0, 3)} {currentDate.getFullYear()}
                  </Text>
                  <MaterialIcons name="keyboard-arrow-down" size={20} color="#0D1634" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigateMonth('next')}>
                  <MaterialIcons name="chevron-right" size={24} color="#0D1634" />
                </TouchableOpacity>
              </View>

              {/* Week Days Header */}
              <View style={styles.weekDaysContainer}>
                {weekDays.map((day, index) => (
                  <View key={index} style={styles.weekDay}>
                    <Text style={styles.weekDayText}>{day}</Text>
                  </View>
                ))}
              </View>

              {/* Calendar Grid */}
              <View style={styles.calendarGrid}>
                {renderCalendarDays()}
              </View>
            </>
          ) : viewMode === 'month' ? (
            <>
              {/* Year Navigation */}
              <View style={styles.navigation}>
                <TouchableOpacity onPress={() => navigateYear('prev')}>
                  <MaterialIcons name="chevron-left" size={24} color="#0D1634" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.monthYearButton}
                  onPress={() => setViewMode('year')}
                >
                  <Text style={styles.monthYearText}>{currentDate.getFullYear()}</Text>
                  <MaterialIcons name="keyboard-arrow-down" size={20} color="#0D1634" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigateYear('next')}>
                  <MaterialIcons name="chevron-right" size={24} color="#0D1634" />
                </TouchableOpacity>
              </View>

              {/* Month Grid */}
              <View style={styles.monthGrid}>
                {renderMonthGrid()}
              </View>
            </>
          ) : (
            <>
              {/* Year Navigation */}
              <View style={styles.navigation}>
                <TouchableOpacity onPress={() => {
                  const newDate = new Date(currentDate);
                  newDate.setFullYear(Math.floor(currentDate.getFullYear() / 10) * 10 - 10);
                  setCurrentDate(newDate);
                }}>
                  <MaterialIcons name="chevron-left" size={24} color="#0D1634" />
                </TouchableOpacity>
                <View style={styles.monthYearButton}>
                  <Text style={styles.monthYearText}>
                    {Math.floor(currentDate.getFullYear() / 10) * 10 - 2} - {Math.floor(currentDate.getFullYear() / 10) * 10 + 9}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => {
                  const newDate = new Date(currentDate);
                  newDate.setFullYear(Math.floor(currentDate.getFullYear() / 10) * 10 + 10);
                  setCurrentDate(newDate);
                }}>
                  <MaterialIcons name="chevron-right" size={24} color="#0D1634" />
                </TouchableOpacity>
              </View>

              {/* Year Grid */}
              <View style={styles.yearGrid}>
                {renderYearGrid()}
              </View>
            </>
          )}

          {/* Select Button */}
          <TouchableOpacity 
            style={[styles.selectButton, !selectedDate && styles.selectButtonDisabled]}
            onPress={handleSelect}
            disabled={!selectedDate}
          >
            <Text style={styles.selectButtonText}>Select Date</Text>
          </TouchableOpacity>
        </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  containerWrapper: {
    width: '100%',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 32,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    // Shadow for Android
    elevation: 20,
    // Border for subtle separation
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#E0E0E0',
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D1634',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#9E9E9E',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthYearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  monthYearText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0D1634',
  },
  weekDaysContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  weekDay: {
    flex: 1,
    alignItems: 'center',
  },
  weekDayText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9E9E9E',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  dayText: {
    fontSize: 16,
    color: '#424242',
  },
  selectedDay: {
    backgroundColor: '#0D1634',
    borderRadius: 8,
  },
  selectedDayText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  todayText: {
    color: '#42A5F5',
    fontWeight: '600',
  },
  yearGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  yearCell: {
    width: '30%',
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingVertical: 12,
  },
  yearText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#424242',
    textAlign: 'center',
  },
  selectedYear: {
    backgroundColor: '#0D1634',
    borderColor: '#0D1634',
  },
  selectedYearText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  monthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  monthCell: {
    width: '30%',
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingVertical: 12,
  },
  monthText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#424242',
    textAlign: 'center',
  },
  selectedMonth: {
    backgroundColor: '#0D1634',
    borderColor: '#0D1634',
  },
  selectedMonthText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  selectButton: {
    backgroundColor: '#0D1634',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  selectButtonDisabled: {
    opacity: 0.5,
  },
  selectButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

