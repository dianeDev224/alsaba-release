import {
  FaCalendarPlus,
  FaGlobe,
} from 'react-icons/fa';
import { FaClock } from 'react-icons/fa6';
import {
  FiActivity,
  FiRepeat,
} from 'react-icons/fi';
import { GiBoxUnpacking } from 'react-icons/gi';
import {
  IoIosContacts,
  IoMdContacts,
} from 'react-icons/io';
import {
  IoArrowRedoSharp,
  IoArrowUndo,
  IoChatboxEllipsesSharp,
} from 'react-icons/io5';
import { IconType } from 'react-icons/lib';
import { LuArrowUpDown } from 'react-icons/lu';
import {
  MdBorderColor,
  MdShowChart,
} from 'react-icons/md';
import { SiMoneygram } from 'react-icons/si';
import {
  VscReferences,
  VscSignIn,
} from 'react-icons/vsc';

interface DashbordRoutType {
    id : number ;
    name : string;
    logo : IconType; 
    route : string;
    container: number ; 
}

interface RoutecontainerType {
    id : number , 
    name : string 
}


export const routeContainers : Array<RoutecontainerType> = [
    {
        id : 1 , 
        name : "Tableau de bord" 
    } , 
    {
        id : 2 , 
        name : "Operations" 
    } , 
    {
        id : 3 , 
        name : "Caisse" 
    } , 
    {
        id : 4 , 
        name : "Comptabilités" 
    } , 
    {
        id : 5 , 
        name : "Tâches et disponibilité" 
    } , 
    {
        id : 6 , 
        name : "Annonces" 
    } , 
    {
        id : 7 , 
        name : "Communications" 
    } , 
    {
        id : 8 , 
        name : "Configurations" 
    } , 
]

export const dashbordRoutes : Array<DashbordRoutType> = [
    {
        id : 1,
        name:"Transferts" , 
        logo :LuArrowUpDown  , 
        route : "transferts"  , 
        container : 2

    } , 
    {
        id : 2,
        name:"Code money" , 
        logo :SiMoneygram  , 
        route : "code-money"  , 
        container : 2

    } , 
    {
        id : 3,
        name:"Depots" , 
        logo :IoArrowRedoSharp  , 
        route : "depots"  , 
        container : 2

    } , 
    {
        id : 4,
        name:"Retrait" , 
        logo :IoArrowUndo  , 
        route : "retraits"  , 
        container : 2

    } , 
    {
        id : 5,
        name:"Emprunts" , 
        logo :MdBorderColor  , 
        route : "emprunts"  , 
        container : 3

    } , 
    {
        id : 6,
        name:"Dettes" , 
        logo :IoMdContacts  , 
        route : "dettes"  , 
        container : 3

    } , 
    {
        id : 7,
        name:"Prêts" , 
        logo :IoIosContacts  , 
        route : "prets"  , 
        container : 3

    } , 
    {
        id : 8,
        name:"Injections" , 
        logo :FiActivity  , 
        route : "injections"  , 
        container : 3

    } , 
    {
        id : 9,
        name:"Auto Injections" , 
        logo :FiRepeat  , 
        route : "auto-injection"  , 
        container : 3

    } , 
    {
        id : 10,
        name:"Epargne" , 
        logo :MdShowChart  , 
        route : "epargne"  , 
        container : 3

    } , 
    {
        id : 11,
        name:"Charges Fictives" , 
        logo :VscReferences  , 
        route : "charge-fictive"  , 
        container : 3

    } , 
    {
        id : 12,
        name:"Charges Réelles" , 
        logo :VscSignIn  , 
        route : "charges-reelles"  , 
        container : 3

    } , 
    {
        id : 13,
        name:"Caveaux" , 
        logo :IoArrowUndo  , 
        route : "caveaux"  , 
        container : 4

    } , 
    {
        id : 14,
        name:"Partenaires" , 
        logo :IoArrowUndo  , 
        route : "partenaires"  , 
        container : 4

    } , 
    {
        id : 15,
        name:"Tâches Plannifiées" , 
        logo :FaCalendarPlus  , 
        route : "taches-plannifier"  , 
        container : 5

    } , 
    {
        id : 16,
        name:"Diposnibilités" , 
        logo :FaClock  , 
        route : "disponibilités"  , 
        container : 5

    } , 
    {
        id : 17 ,
        name:"Colis" , 
        logo :GiBoxUnpacking  , 
        route : "alsaba-colis"  , 
        container : 6

    } , 
    {
        id : 18,
        name:"Alchat" , 
        logo :IoChatboxEllipsesSharp  , 
        route : "alchat"  , 
        container : 7

    } , 
    {
        id : 19,
        name:"Pays" , 
        logo :FaGlobe  , 
        route : "pays"  , 
        container : 8

    } , 

]

