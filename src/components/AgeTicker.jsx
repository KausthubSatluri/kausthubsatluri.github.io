import React, { useState, useEffect, useCallback } from 'react';
import './AgeTicker.css';

const AgeTicker = ({ birthDate }) => {
    const [age, setAge] = useState({});
    const [isGlitching, setIsGlitching] = useState(false);
    const [glitchClicked, setGlitchClicked] = useState(false);

    useEffect(() => {
        const calculateAge = () => {
            const now = new Date();
            const birth = new Date(birthDate);

            let years = now.getFullYear() - birth.getFullYear();
            let months = now.getMonth() - birth.getMonth();
            let days = now.getDate() - birth.getDate();

            // Adjust for negative days (borrow from previous month)
            if (days < 0) {
                months--;
                // Get days in previous month
                const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
                days += prevMonth.getDate();
            }

            // Adjust for negative months (borrow from year)
            if (months < 0) {
                years--;
                months += 12;
            }

            // Let's use clean diff for time parts regardless of date
            const hours = now.getHours() - birth.getHours();
            const minutes = now.getMinutes() - birth.getMinutes();
            const seconds = now.getSeconds() - birth.getSeconds();

            // Fix negative time units
            let h = hours;
            let m = minutes;
            let s = seconds;

            if (s < 0) { s += 60; m--; }
            if (m < 0) { m += 60; h--; }
            if (h < 0) { h += 24; days--; }
            // Re-check days in case time borrowed a day
            if (days < 0) {
                months--;
                const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
                days += prevMonth.getDate();
            }
            if (months < 0) { years--; months += 12; }

            setAge({ years, months, days, hours: h, minutes: m, seconds: s });
        };

        calculateAge();
        const interval = setInterval(calculateAge, 1000);

        return () => clearInterval(interval);
    }, [birthDate]);

    // Glitch effect - shows special date every 14 seconds for 2 seconds
    useEffect(() => {
        const glitchInterval = setInterval(() => {
            setIsGlitching(true);
            setTimeout(() => {
                setIsGlitching(false);
            }, 2000);
        }, 14000);

        return () => clearInterval(glitchInterval);
    }, []);

    const handleGlitchClick = useCallback(() => {
        if (isGlitching) {
            localStorage.setItem('timelineUnlocked', 'true');
            window.dispatchEvent(new Event('storage'));
            setGlitchClicked(true);
            setTimeout(() => setGlitchClicked(false), 600);
        }
    }, [isGlitching]);

    // The special glitch date to display
    const glitchDisplay = {
        years: '2024',
        months: '10',
        days: '12',
        hours: '--',
        minutes: '--',
        seconds: '--'
    };

    const displayAge = isGlitching ? glitchDisplay : age;

    return (
        <div
            className={`age-ticker card-glass${isGlitching ? ' glitching' : ''}${glitchClicked ? ' glitch-flash' : ''}`}
            onClick={handleGlitchClick}
            role={isGlitching ? 'button' : undefined}
            tabIndex={isGlitching ? 0 : undefined}
        >
            <div className="ticker-label">
                {isGlitching ? 'Something happened...' : 'Time on Earth'}
            </div>
            <div className="ticker-value">
                <span className="unit-group">
                    <span className="value">{displayAge.years}</span>
                    <span className="unit">{isGlitching ? 'YEAR' : 'YRS'}</span>
                </span>
                <span className="separator">{isGlitching ? '-' : ':'}</span>
                <span className="unit-group">
                    <span className="value">{isGlitching ? displayAge.months : String(age.months).padStart(2, '0')}</span>
                    <span className="unit">MTH</span>
                </span>
                <span className="separator">{isGlitching ? '-' : ':'}</span>
                <span className="unit-group">
                    <span className="value">{isGlitching ? displayAge.days : String(age.days).padStart(2, '0')}</span>
                    <span className="unit">{isGlitching ? 'DAY' : 'DAYS'}</span>
                </span>
                <span className="separator">:</span>
                <span className="unit-group">
                    <span className="value">{isGlitching ? displayAge.hours : String(age.hours).padStart(2, '0')}</span>
                    <span className="unit">HRS</span>
                </span>
                <span className="separator">:</span>
                <span className="unit-group">
                    <span className="value">{isGlitching ? displayAge.minutes : String(age.minutes).padStart(2, '0')}</span>
                    <span className="unit">MIN</span>
                </span>
                <span className="separator">:</span>
                <span className="unit-group highlight-seconds">
                    <span className="value">{isGlitching ? displayAge.seconds : String(age.seconds).padStart(2, '0')}</span>
                    <span className="unit">SEC</span>
                </span>
            </div>
        </div>
    );
};

export default AgeTicker;
