import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Alert, Button, Container} from 'react-bootstrap';
import {ArrowLeft, XLg} from 'react-bootstrap-icons';
import {IngressoCadastro} from './IngressoCadastro';
import {IngressoListagem} from './IngressoListagem';

export function IngressoVendaPage() {
	const {sessaoId} = useParams<{sessaoId: string}>();
	const navigate = useNavigate();
	const [loadKey, setLoadKey] = useState(0);

	const handleLoadLista = () => {
		setLoadKey((prev) => prev + 1);
	};

	if (!sessaoId) {
		return (
			<Container className="mt-4">
				<Alert variant="danger">Sessão inválida. Volte para a lista de sessões.</Alert>
				<Button onClick={() => navigate('/sessoes')} variant="secondary">
					<XLg className="me-1" /> Voltar
				</Button>
			</Container>
		);
	}

	return (
		<Container className="mt-4">
			<IngressoCadastro sessaoId={sessaoId} loadLista={handleLoadLista} />
			<IngressoListagem sessaoId={sessaoId} loadKey={loadKey} />
			<Button onClick={() => navigate('/sessoes')} variant="secondary" className="mt-4">
				<ArrowLeft className="me-1" /> Voltar
			</Button>
		</Container>
	);
}
