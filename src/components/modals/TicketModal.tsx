import React, { useState } from 'react';
import { sounds } from '../../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  zipCode: string;
}

export const TicketModal: React.FC<Props> = ({ isOpen, onClose, zipCode }) => {
  const [selectedTheater, setSelectedTheater] = useState(0);
  const [selectedTime, setSelectedTime] = useState('7:15 PM');
  const [ticketCount, setTicketCount] = useState(2);
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const theaters = [
    {
      name: 'TOHO Cinemas Kasukabe Grand 3D & IMAX',
      distance: '0.6 miles away',
      address: '7-1 Chuo, Kasukabe, Saitama',
      formats: ['IMAX 3D', 'RealD 3D', '4DX Motion'],
      times: ['1:30 PM', '4:15 PM 3D', '7:15 PM IMAX', '9:45 PM'],
    },
    {
      name: 'Aeon Cinema Kasukabe Mega Screen 12',
      distance: '1.2 miles away',
      address: 'Aeon Mall Kasukabe, 2-1 Shimoyanagi',
      formats: ['RealD 3D', 'Standard Digital'],
      times: ['12:45 PM', '3:30 PM', '6:30 PM 3D', '9:15 PM'],
    },
    {
      name: 'United Cinemas Lalaport 3D Theater',
      distance: '2.5 miles away',
      address: 'Lalaport Center Dome, Saitama',
      formats: ['Laser 3D', 'Dolby Atmos Sound'],
      times: ['2:00 PM', '5:00 PM 3D', '8:00 PM IMAX'],
    },
  ];

  const handleBook = () => {
    sounds.playActionBeam();
    setConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md animate-in fade-in duration-200"
      />

      <div className="relative z-10 w-full max-w-xl bg-white dark:bg-neutral-900 rounded-lg shadow-2xl overflow-hidden border border-neutral-300 dark:border-neutral-800 animate-in zoom-in-95 duration-200 transition-colors duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-yellow-300">
              CRAYON SHIN-CHAN 3D THE MOVIE // TICKETS & SHOWTIMES
            </span>
            <h3 className="text-lg font-black uppercase tracking-tight">
              THEATERS NEAR {zipCode || 'KASUKABE'}
            </h3>
          </div>
          <button onClick={onClose} className="text-white hover:text-red-200 text-sm font-bold cursor-pointer">
            ✕
          </button>
        </div>

        {confirmed ? (
          <div className="p-8 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
              <svg className="w-8 h-8 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h4 className="text-xl font-black text-neutral-900 dark:text-white uppercase">
              TICKETS CONFIRMED!
            </h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1 max-w-sm">
              You have reserved {ticketCount} tickets for Crayon Shin-chan 3D at{' '}
              <span className="font-bold text-neutral-900 dark:text-white">{theaters[selectedTheater].name}</span> for{' '}
              <span className="font-bold text-red-600 dark:text-red-400">{selectedTime}</span>.
            </p>
            <div className="mt-4 p-3 bg-neutral-100 dark:bg-neutral-800 rounded text-xs font-mono text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
              CONFIRMATION: #SHINCHAN-3D-{Math.floor(100000 + Math.random() * 900000)}
            </div>
            <div className="mt-3 text-[11px] text-emerald-700 dark:text-emerald-400 font-bold">
              ★ Free Chocobi Movie Popcorn Bucket included with every ticket!
            </div>
            <button
              onClick={onClose}
              className="mt-5 bg-neutral-900 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-100 text-white dark:text-neutral-900 font-bold text-xs uppercase px-5 py-2.5 rounded shadow cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="p-5 flex flex-col gap-4 max-h-[75vh] overflow-y-auto">
            {/* Theaters list */}
            <div className="space-y-3">
              {theaters.map((th, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedTheater(idx)}
                  className={`p-3.5 rounded border cursor-pointer transition-all ${
                    selectedTheater === idx
                      ? 'border-red-600 dark:border-red-500 bg-red-50/50 dark:bg-red-950/20 shadow-xs'
                      : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 bg-white dark:bg-neutral-900/60'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-neutral-900 dark:text-white">{th.name}</h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {th.address} · {th.distance}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {th.formats.map((f, i) => (
                        <span
                          key={i}
                          className="text-[9px] font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-1.5 py-0.5 rounded border border-neutral-300 dark:border-neutral-700"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Showtimes */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {th.times.map((t, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTheater(idx);
                          setSelectedTime(t);
                        }}
                        className={`text-xs font-bold px-2.5 py-1 rounded transition-colors cursor-pointer ${
                          selectedTheater === idx && selectedTime === t
                            ? 'bg-red-600 text-white shadow-xs'
                            : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Ticket count & Checkout */}
            <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center justify-between sm:justify-start gap-2">
                <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">TICKETS:</span>
                <div className="flex items-center border border-neutral-300 dark:border-neutral-700 rounded overflow-hidden">
                  <button
                    onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                    className="w-8 h-8 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 active:bg-neutral-300 dark:active:bg-neutral-600 text-neutral-900 dark:text-white text-xs font-bold flex items-center justify-center cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-bold font-mono min-w-8 text-center text-neutral-900 dark:text-white">{ticketCount}</span>
                  <button
                    onClick={() => setTicketCount(Math.min(10, ticketCount + 1))}
                    className="w-8 h-8 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 active:bg-neutral-300 dark:active:bg-neutral-600 text-neutral-900 dark:text-white text-xs font-bold flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleBook}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-black text-xs uppercase px-6 py-3 sm:py-2.5 rounded shadow transition-all active:scale-98 cursor-pointer"
              >
                SELECT SEATS & BUY
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
