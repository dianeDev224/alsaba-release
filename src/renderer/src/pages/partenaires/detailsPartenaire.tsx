// @ts-nocheck
import React, {
  useContext,
  useEffect,
  useState,
} from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { BsFillPencilFill } from 'react-icons/bs';
import {
  FaArrowLeft,
  FaRegEyeSlash,
} from 'react-icons/fa';
import { FaRegEye } from 'react-icons/fa6';
import {
  useLocation,
  useNavigate,
} from 'react-router-dom';

import {
  TableFraisPartenaire,
} from '@renderer/components/tables/tablePartenaire';

import { LoaderContext } from '../../hooks/loader';
import { supabase } from '../../repository/connection';

export default function DetailsPartenaireAlsaba(): JSX.Element {
	const [expendDetails, setExpendDetails] = useState(true)
	const [activateEdition, setActivateEdition] = useState(false)
	const [formValid, setFormValid] = useState(false)
	const [fraisData, setFraisData] = useState(false)
	const location = useLocation()
	const paysData = location.state?.paysData
	const [paysFormData, setPaysFormData] = useState({
		nom: paysData.nom,
		capital: paysData.capital,
		devise: paysData.devise,
		code: paysData.code
	})
	const navigator = useNavigate()
	const { isLoading, changeLoadingState } = useContext(LoaderContext)

	useEffect(() => {
		changeLoadingState(true)
		setTimeout(() => {
            const data = [
                {
                    id : 1 , 
                    pays : "Guinnée" , 
                    borneInf: 0 , 
                    borneSup: 200 , 
                    typeFrais : 0 , 
                    frais: 200 , 
                } , 
                {
                    id : 2 , 
                    pays : "Mali" , 
                    borneInf: 0 , 
                    borneSup: 200 , 
                    typeFrais : 1 , 
                    frais: 20 , 
                } , 
                
            ]
            setFraisData(data)
			changeLoadingState(false)
		}, 800)
	}, [])

	async function submittForm(): void {
		changeLoadingState(true)
		if (
			paysFormData.capital !== '' &&
			paysFormData.nom !== '' &&
			paysFormData.devise !== '' &&
			paysFormData.code !== ''
		) {
			const { data: pays, error } = await supabase
				.from('pays')
				.update({
					nom_pays: paysFormData.nom,
					nom_capital: paysFormData.capital,
					code_pays: paysFormData.code,
					devise: paysFormData.devise
					// date_derniere_modif : Date.now()
				})
				.eq('nom_pays', paysData.nom)
				.select()
			console.log('INSERT_ERROR : ', error?.code)
			if (!error) {
				setFormValid(false)
				setActivateEdition(false)
				// setShow(false)
			}
		} else {
			setFormValid(true)
		}
		changeLoadingState(false)
	}

	return (
		<div className="flex h-[470px] flex-col px-[20px] space-y-4 overflow-y-scroll  scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-orange-600 scrollbar-corner-gray-300">
			{/* header */}
			<div className="flex flex-row w-full justify-between items-center">
				{/* left side */}
				<div className="flex flex-row w-[200px] space-x-2 items-center h-[60px]">
					<FaArrowLeft color={'#7b3535'} onClick={() => navigator(-1)} className="cursor-pointer" />
					<h3 className="font-light uppercase text-[#5f6163]">Détails du Partenaire</h3>
				</div>
				{/* right side */}
				<div className="flex flex-row w-[150px] h-[60px] items-center justify-end space-x-2">
					{expendDetails && (
						<FaRegEyeSlash color={'#7b3535'} onClick={() => setExpendDetails(false)} />
					)}
					{!expendDetails && <FaRegEye color="#7b3535" onClick={() => setExpendDetails(true)} />}
				</div>
			</div>
			{/* les détails du pays */}
			{expendDetails && (
				<div className="flex flex-2 basis-[65%] h-[360px] flex-col items-center py-2 space-y-3 bg-[#fff]  border-[3px] border-[#cecbcb] rounded-md">
					{/* titre */}
					<p className="flex flex-row text-[#e98033] cursor-pointer">
						Info Détails{' '}
						<BsFillPencilFill className="mx-2" onClick={() => setActivateEdition(true)} />{' '}
					</p>
					{/* nom pays */}
					<div>
						<InputText
							disabled={!activateEdition}
							placeholder="nom du pays"
							value={paysFormData.nom}
							onChange={(e) => setPaysFormData({ ...paysFormData, nom: e.target.value })}
							pt={{
								root: { className: classNames('rounded-sm border-[2px]  w-[250px] h-[40px]') }
							}}
						/>
						{formValid && paysFormData.nom === '' && (
							<p className="text-[10px] text-[#8f1c1c] font-bold">le nom est un champ bligatoire</p>
						)}
					</div>
					{/* code pays */}
					<div>
						<InputText
							placeholder="code du pays"
							disabled={!activateEdition}
							value={paysFormData.code}
							onChange={(e) => setPaysFormData({ ...paysFormData, code: e.target.value })}
							pt={{
								root: { className: classNames('rounded-sm border-[2px]  w-[250px] h-[40px]') }
							}}
						/>
						{formValid && paysFormData.code === '' && (
							<p className="text-[10px] text-[#8f1c1c] font-bold">
								le code est un champ bligatoire
							</p>
						)}
					</div>
					{/* devise pays  */}
					<div>
						<InputText
							placeholder="devise du pays"
							disabled={!activateEdition}
							value={paysFormData.devise}
							onChange={(e) => setPaysFormData({ ...paysFormData, devise: e.target.value })}
							pt={{
								root: { className: classNames('rounded-sm border-[2px]  w-[250px] h-[40px]') }
							}}
						/>
						{formValid && paysFormData.devise === '' && (
							<p className="text-[10px] text-[#8f1c1c] font-bold">
								la devise est un champ bligatoire
							</p>
						)}
					</div>
					{/* capital du pays  */}
					<div>
						<InputText
							placeholder="capital du pays"
							disabled={!activateEdition}
							value={paysFormData.capital}
							onChange={(e) => setPaysFormData({ ...paysFormData, capital: e.target.value })}
							pt={{
								root: { className: classNames('rounded-sm border-[2px]  w-[250px] h-[40px]') }
							}}
						/>
						{formValid && paysFormData.capital === '' && (
							<p className="text-[10px] text-[#8f1c1c] font-bold">
								la capitale est un champ bligatoire
							</p>
						)}
					</div>
					{/* validation button */}
					{activateEdition && (
						<div className="flex flex-row space-x-3 self-center">
							<Button
								label="Valider"
								pt={{
									root: { className: 'bg-[#7b3535] text-[#cecbcb]  w-[100px] h-[40px] rounded-md' }
								}}
								onClick={() => submittForm()}
							/>
							<Button
								label="Annuler"
								onClick={() => setActivateEdition(false)}
								pt={{
									root: { className: 'bg-[#7b3535] text-[#cecbcb]  w-[100px] h-[40px] rounded-md' }
								}}
							/>
						</div>
					)}
				</div>
			)}
			<h3 className="font-light uppercase text-[#5f6163] w-full text-center">
				Les Frais de ce partenaire
			</h3>
			{/* les frais du partenaire */}
			<TableFraisPartenaire data={fraisData} />
		</div>
	)
}
