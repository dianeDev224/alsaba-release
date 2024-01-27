// @ts-nocheck
import {
  MemoryRouter,
  Route,
  Routes,
} from 'react-router-dom';

import App from '@renderer/App';
import { WithLoading } from '@renderer/components/withLoading';
import Alchat from '@renderer/pages/alchat';
import AlsabaColis from '@renderer/pages/alsaba_colis';
import AutoInjection from '@renderer/pages/auto_injection';
import Caveaux from '@renderer/pages/caveaux';
import ConfigurationCaveaux from '@renderer/pages/caveaux/configurationCaveaux';
import DetailListeCaveaux from '@renderer/pages/caveaux/detailsLiseCaveaux';
import ListeCaveaux from '@renderer/pages/caveaux/listeCaveaux';
import ChargesFictives from '@renderer/pages/charges_fictive';
import ChargesRelles from '@renderer/pages/charges_relles';
import CodeMoney from '@renderer/pages/code_money';
import Depots from '@renderer/pages/depots';
import Dettes from '@renderer/pages/dettes';
import Disponibilité from '@renderer/pages/disponibilite';
import Emprunts from '@renderer/pages/emprunts';
import Epargne from '@renderer/pages/epargne';
import Injections from '@renderer/pages/injections';
import Partenaires from '@renderer/pages/partenaires';
import DetailsPartenaireAlsaba
  from '@renderer/pages/partenaires/detailsPartenaire';
import PartenairesAlsaba from '@renderer/pages/partenaires/partenairesAlsaba';
import Pays from '@renderer/pages/pays';
import DetailFraisPays from '@renderer/pages/pays/detailFraisPays';
import DetailPays from '@renderer/pages/pays/detailPays';
import DetailQuartier from '@renderer/pages/pays/detailsQuartier';
import DetailVille from '@renderer/pages/pays/detailsVilles';
import DevisePays from '@renderer/pages/pays/devisePays';
import FraisPays from '@renderer/pages/pays/fraisPays';
import ListePays from '@renderer/pages/pays/listePays';
import Prets from '@renderer/pages/prets';
import Retrait from '@renderer/pages/retraits';
import TableauBord from '@renderer/pages/tableau_bord';
import TachesPlannifier from '@renderer/pages/taches_plannifier';
import Transferts from '@renderer/pages/transferts';

export default function Approuter(): JSX.Element {
	return (
		<MemoryRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route index element={<TableauBord />}></Route>
					<Route path="transferts" element={<Transferts />}></Route>
					<Route path="code-money" element={<CodeMoney />}></Route>
					<Route path="depots" element={<Depots />}></Route>
					<Route path="retraits" element={<Retrait />}></Route>
					<Route path="emprunts" element={<Emprunts />}></Route>
					<Route path="dettes" element={<Dettes />}></Route>
					<Route path="prets" element={<Prets />}></Route>
					<Route path="injections" element={<Injections />}></Route>
					<Route path="auto-injection" element={<AutoInjection />}></Route>
					<Route path="epargne" element={<Epargne />}></Route>
					<Route path="charge-fictive" element={<ChargesFictives />}></Route>
					<Route path="charges-reelles" element={<ChargesRelles />}></Route>
					<Route path="caveaux" element={<Caveaux />}>
						<Route index element={<WithLoading WrappedComponent={ListeCaveaux} />} />
						<Route
							path="configuration-caveaux"
							element={<WithLoading WrappedComponent={ConfigurationCaveaux} />}
						/>
						<Route
							path="details-liste-caveaux"
							element={<WithLoading WrappedComponent={DetailListeCaveaux} />}
						/>
					</Route>
					<Route path="partenaires" element={<Partenaires />}>
						<Route index element={<WithLoading WrappedComponent={PartenairesAlsaba} />} />
						<Route
							path="details-partenaires"
							element={<WithLoading WrappedComponent={DetailsPartenaireAlsaba} />}
						/>
					</Route>
					<Route path="taches-plannifier" element={<TachesPlannifier />}></Route>
					<Route path="disponibilités" element={<Disponibilité />}></Route>
					<Route path="alsaba-colis" element={<AlsabaColis />}></Route>
					<Route path="alchat" element={<Alchat />}></Route>
					<Route path="pays" element={<Pays />}>
						<Route index element={<WithLoading WrappedComponent={ListePays} />} />
						<Route path="frais-pays" element={<WithLoading WrappedComponent={FraisPays} />} />
						<Route path="devise-pays" element={<WithLoading WrappedComponent={DevisePays} />} />
						<Route path="details-pays" element={<WithLoading WrappedComponent={DetailPays} />} />
						<Route path="details-villes" element={<WithLoading WrappedComponent={DetailVille} />} />
						<Route
							path="details-quartiers"
							element={<WithLoading WrappedComponent={DetailQuartier} />}
						/>
						<Route
							path="details-frais-pays"
							element={<WithLoading WrappedComponent={DetailFraisPays} />}
						/>
					</Route>
				</Route>
			</Routes>
		</MemoryRouter>
	)
}
