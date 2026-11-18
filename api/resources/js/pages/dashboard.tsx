import { Head } from '@inertiajs/react';

interface Stat {
  label: string;
  value: number;
}

interface RecentLog {
  id: number;
  mode: string;
  commodity: string;
  total_ml: number | null;
  created_at: string;
}

interface DashboardProps {
  stats: Stat[];
  recentLogs: RecentLog[];
}

export default function Dashboard({ stats, recentLogs }: DashboardProps) {
  return (
    <>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        {/* Stats Cards */}
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-sidebar-border/70 bg-card p-6 dark:border-sidebar-border"
            >
              <p className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </p>
              <p className="mt-2 text-3xl font-bold text-foreground">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Logs */}
        <div className="rounded-lg border border-sidebar-border/70 bg-card p-6 dark:border-sidebar-border">
          <h3 className="text-lg font-semibold text-foreground">
            Perhitungan Terbaru
          </h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">
                    Mode
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">
                    Komoditas
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">
                    Total
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">
                    Waktu
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentLogs.length > 0 ? (
                  recentLogs.map((log) => (
                    <tr key={log.id} className="border-b border-border">
                      <td className="px-4 py-3 text-foreground">
                        {log.mode === 'plant' && 'Pertanian'}
                        {log.mode === 'livestock' && 'Peternakan'}
                        {log.mode === 'fishery' && 'Perikanan'}
                      </td>
                      <td className="px-4 py-3 text-foreground">
                        {log.commodity}
                      </td>
                      <td className="px-4 py-3 font-mono text-primary">
                        {log.total_ml ? `${log.total_ml} ml` : '—'}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {log.created_at}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-3 text-center text-muted-foreground"
                    >
                      Belum ada perhitungan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

Dashboard.layout = {
  breadcrumbs: [
    {
      title: 'Dashboard',
      href: '#',
    },
  ],
};
