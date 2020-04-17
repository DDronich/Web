var name='';
var surname='';
var gender='';
var day=0;
var month=0;
var year ='';

class person
{
    constructor(name, surname, gender, day, month,Year)
    {
        this.name = name;
        this.surname=surname;
        this.gender=gender;
        this.day=day;
        this.month=month;
        this.year=Year;

    }
    converter_name(name)
    {
        name=name.toLowerCase();
        var fisc1='';
        var letters = 0;
        const vow = 'aeiou';

        for (var i of name)
        {
            var vowe = false;
            for (var j of vow)
            {
                if (j == i) {vowe = true;}
            }
            if (!vowe && letters < 4)
            {
                fisc1 += i;
                letters++;
            }
        }
        for (var i of name)
        {
            for (var j of vow)
            {
                if (j==i){
                    fisc1 +=i;
                    letters++;

                }
            }
            if (letters==3) break;
        }
        if (letters == 4) {fisc1 = fisc1.splice(fisc1[1], 1, '')}
        return fisc1.toUpperCase()


    }
    converter_surname(surname)
    {
        surname=surname.toLowerCase();
        var fisc2='';
        var letters = 0;
        const vow = 'aeiou';
        for (var i of surname) {
            var vowe = false;
            for (var j of vow) {
                if (j == i) {
                    vowe = true
                }
            }

            if (!vowe && letters < 3) {
                fisc2 += i;
                letters++;
            }
        }
        if (letters <3)
        {
            for (var i of surname){
                for (var j of vowe)
                {
                    if (j==i){
                        fisc2+=i;
                        letters++;
                    }
                }
                if (letters==3)
                    break;
            }
        }
        if (letters<3)
        {
            for (var i=0; i<(3-surname.length);i++)
                 fisc2+='x';
        }
        return fisc2.toUpperCase();


    }

    converter_date()
    {
        const months = { 1: "A", 2: "B", 3: "C", 4: "D", 5: "E", 6: "H", 7: "L", 8: "M", 9: "P", 10: "R", 11: "S", 12: "T" }
        var fisc='';
        var last_fisc = 0;
        if (gender == 'female' ){last_fisc = 40+this.day}
        else
        {
            if (this.day<10){last_fisc = '0'+this.day}
            else
            {
                last_fisc=this.day;
            }

        }
        fisc+=this.year[2] + this.year[3] + months[this.month] + last_fisc;
        return fisc;

    }

    fiscal_code()
    {
        return (this.converter_surname(this.surname)+this.converter_name(this.name)+this.converter_date())
    }




}

var and = new person('Andrew', 'Lebovski', 'male', 16, 8,2000)

console.log(and.fiscal_code());

