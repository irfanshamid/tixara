"use client";

interface InfoCard {
  id: number;
  title: string;
  description: string;
}

const infoCards: InfoCard[] = [
  {
    id: 1,
    title: "Live Data Monitoring",
    description:
      "Pantau performa akun TikTok secara real-time, termasuk engagement, likes, dan views tanpa delay.",
  },
  {
    id: 2,
    title: "Automatic Data Sync",
    description:
      "Sistem secara otomatis memperbarui data scalping dari sumber TikTok setiap beberapa detik.",
  },
  {
    id: 3,
    title: "Historical Tracking",
    description:
      "Lihat pergerakan performa konten dari waktu ke waktu dengan grafik interaktif dan data historis.",
  },
  {
    id: 4,
    title: "Manual & Support",
    description:
      "Baca panduan lengkap cara penggunaan dashboard dan hubungi tim support jika mengalami kendala.",
  },
];

export default function GeneralInformationCard() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <div className="col-span-2">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Guide Information
            </h3>
        </div>
        {infoCards.map((card) => (
            <div className="space-y-6" key={card.id}>
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
                    {card.title}
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {card.description}
                    </p>
                </div>
            </div>
        ))}
    </div>
  );
}
