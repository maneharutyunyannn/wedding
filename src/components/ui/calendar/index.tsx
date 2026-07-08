const weekdays = ["Երկ", "Երք", "Չոր", "Հնգ", "Ուրբ", "Շբթ", "Կիր"];

const startOffset = 5;
const totalDays = 31;

const cells = Array.from(
    { length: startOffset + totalDays },
    (_, index) => (index < startOffset ? null : index - startOffset + 1)
);

export default function WeddingCalendar() {
    return (
        <div className="calendar">
            {weekdays.map((day) => (
                <div key={day} className="weekday">
                    {day}
                </div>
            ))}

            {cells.map((day, index) => (
                <div key={index} className="cell">
                    {day !== null && (
                        <span className={day === 23 ? "selected" : ""}>
              {day}
            </span>
                    )}
                </div>
            ))}
        </div>
    );
}