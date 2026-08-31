import { AppProvider, useApp } from './context/AppContext';
import NavDock from './components/NavDock';
import Modal from './components/Modal';
import NewJobForm from './components/forms/NewJobForm';
import NewAccountForm from './components/forms/NewAccountForm';
import NewCrewForm from './components/forms/NewCrewForm';
import EODReportForm from './components/forms/EODReportForm';
import HomePage from './pages/HomePage';
import AccountsPage from './pages/AccountsPage';
import CrewPage from './pages/CrewPage';
import InvoicesPage from './pages/InvoicesPage';
import JobsPage from './pages/JobsPage';

function AppShell() {
  const { page, detail, modal, closeModal } = useApp();

  const modalConfig: Record<string, { title: string; content: React.ReactNode }> = {
    'new-job': {
      title: 'New Job',
      content: <NewJobForm onClose={closeModal} />,
    },
    'new-account': {
      title: 'New Account',
      content: <NewAccountForm onClose={closeModal} />,
    },
    'new-crew': {
      title: 'Add Crew Member',
      content: <NewCrewForm onClose={closeModal} />,
    },
    'eod-report': {
      title: 'EOD Report',
      content: <EODReportForm onClose={closeModal} />,
    },
  };

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage />;
      case 'accounts':
        return <AccountsPage detailId={detail?.type === 'account' ? detail.id : undefined} />;
      case 'crew':
        return <CrewPage detailId={detail?.type === 'crew' ? detail.id : undefined} />;
      case 'invoices':
        return <InvoicesPage />;
      case 'jobs':
        return <JobsPage detailId={detail?.type === 'job' ? detail.id : undefined} />;
    }
  };

  const activeModal = modal ? modalConfig[modal] : null;

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#222222' }}>
      {renderPage()}
      <NavDock />
      {activeModal && (
        <Modal title={activeModal.title} onClose={closeModal}>
          {activeModal.content}
        </Modal>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
