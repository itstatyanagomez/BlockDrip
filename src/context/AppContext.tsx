import { createContext, useContext, useState, ReactNode } from 'react';

export type Page = 'home' | 'accounts' | 'crew' | 'invoices' | 'jobs';
export type DetailType = 'account' | 'crew' | 'job';
export type ModalType = 'new-job' | 'new-account' | 'new-crew' | 'eod-report';

export interface DetailView {
  type: DetailType;
  id: string;
}

interface AppContextType {
  page: Page;
  detail: DetailView | null;
  modal: ModalType | null;
  navigate: (p: Page) => void;
  openDetail: (type: DetailType, id: string) => void;
  closeDetail: () => void;
  openModal: (m: ModalType) => void;
  closeModal: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<Page>('home');
  const [detail, setDetail] = useState<DetailView | null>(null);
  const [modal, setModal] = useState<ModalType | null>(null);

  const navigate = (p: Page) => {
    setPage(p);
    setDetail(null);
  };

  const openDetail = (type: DetailType, id: string) => {
    setDetail({ type, id });
  };

  const closeDetail = () => setDetail(null);
  const openModal = (m: ModalType) => setModal(m);
  const closeModal = () => setModal(null);

  return (
    <AppContext.Provider
      value={{ page, detail, modal, navigate, openDetail, closeDetail, openModal, closeModal }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
