import { split } from "lodash"
import { useRouter } from "next/router"

const arr = ["Rev. Prince Offei - 0547544611","Deacon Elorm Adanu - 0558180065","Deaconess Augustina Ashalley - 0505384202","Bro. Christian Atoklo - 0542869670","Bro. Enoch Acquah - 0244473431","Sis Diane Acquah - 0545568098","Sis. Gloria Asiedu - 0502051797","Bro. Eric Asiedu - 0242243364","Bro. Jonas Tege - 0262882560","Sis. Mercy Tege - 0266452351","Bro. Nelson Tefe - 0273407965","Sis. Anu Gabriel - 0541083881","Sis. Cynthia Amanor - 0242267445","Sis. Sophia Kugblenu - 0241884058","Sis. Georgina Birikorang - 0541956663","Bro. Emmanuel Odianosan - 0205521654","Sis. Mercy Anayetei - 0547959094","Bro. Michael Kudzi - 0245383000","Sis Sophia baah messie - 0246177159","Sis Erica Banful - 0240109693","Sis Grace Akoli - 0241516014","Bro Victor Agbley - 0549426406","Sis Vivian Gbedzi - 0246948190","Sis Cynthia Martey - 0245626629","Sis Dzifa Amendeku - 0274631323","Sis Hager Akoto - 0546709085","Sis Norrien Akoto - 0243144185","Bro Kofi Gyimah - 0245201554","Sis Jackie Adjei - 0247777356","Sis Mavis Etu - 0249245637","Sis Rejoice Oklu - 0552688261","Bro. Lobby Hinson - 0544574537","Sis Naadei Amon - 0235662418","Sis Eyram Kudzuh - 0245623874","Sis Clara Bombo - 0246635069","Sis Augustina Manubea - 0242336968","Bro Bright Asare - 0560488292","Sis Rebecca Degbeh - 0552375096","Sis Lydia Otchere - 0593501577","Bro. Mawutor Ayiaga - 024538300","Sis Edna Bravo - 0241052043","Bro Isreal Agba - 0543096409","Sis Emelia Okra - 0543892826","Sis Daniella Owusu - 0541763794","Sis Esther Akaya - 0599103234","Sis Linda Azure - 05479013234","Mama Rosebud Dodoo - 0208160171","Sis Edem Agbonson - 0552426340","Sis Gifty Boateng - 0247033194","Sis Margaret Lawson - 0246839302","Sis Victoria Searyoh - 0595326305","Sis Marvelous Christian - 0256216557","Sis Priscilla Asare - 0267060207","Bro Emmanuel Puplampu - 0552383238","Bro Patrick Ziwu - 0248807942","Sis Princess Ayim - 0557047109","Sis Abigail Gyasi - 0558613167","Sis Catherine Dansah - 0207836388","Sis Jennifer Agbonson - 0559763574","Bro George Acquaye - 0553874964","Sis Millicent Fomevor - 054867496","Bro Stanley Kesse - 0271039923","Bro Ampaw Boateng - 0245825504","Sis Emelia Appiah - 0276212463","Sis Janet Aniakwa - 0249828055","Bro Daniel Aniakwa - 0249314134","Sis Esther Francis - 0269654776","Sis Patricia Adatsi - 0246473337","Sis Abigail Dodofoli - 0205057925","Bro Michael Mottey - 0277342212","Sis Dorcas Gyasi - 0240730013","Sis Millicent Dodofoli - 0246947071","Bro Patrick Ziwu - 0272880220","Sis  Celest Hamilton - 0554829429","Bro Johnson Asiamah - 0207871124","Bro Dominic Tahiru - 0247579079","Sis Erica Sarpong - 0594601933","Sis Lovely Bart Plang - 0501509070","Sis Patience - 0248718840","Sis Emelia Adde - 0248944678","Sis Vivian - 0246948190","Sis Mary Sossu - 0209400928","Sis Rebecca - 0543277831","Bro Elorm Dzakiti - 0594016521","Sis Abigail Birikorang - 0544100078","Sis Dorcas - 0557686508","Bro Rapheal doe - 0548544681","Bro Michael yao - 0594989628","Bro Augustine Addo - 0547294429"]

export default function CatchAll(){

    const mapArr = arr.map(arr=>{
        return arr
    })
    const router = useRouter()
    return <div>
        Catch All - {JSON.stringify(router)} <hr/>
        Contacts {JSON.stringify(mapArr)} <hr/>
        {
            arr.map(arr=>{
                const fullname = arr.split('-')[0].trim()
                const contacts = arr.split('-')[1].trim()
                const title = fullname.split(' ')[0]
                const firstname = fullname.split(' ')[1]
                const lastname = fullname.split(' ')[2]
                return <>{`${lastname}`} <br/></>
            })
        }
    </div>
}