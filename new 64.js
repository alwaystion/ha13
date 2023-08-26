var month_kwh = 0;
var process_kwh = 0;
//var thb_exc_vat = 0;
var thb_inc_vat = 0;
var ft_inc_vat = 0;
var thb_total = 0;
var thb_fee = 0;

const rate_150 = 3.475788;
const rate_250 = 4.517326;
const rate_400 = 4.731219;
const rate_ft = 0.975733;
const rate_service = 26.3434;

process_kwh = parseFloat(msg.tou_total);
ft_inc_vat = process_kwh * rate_ft;

//150 kwh 0 - 150
if (process_kwh > 150) {
    thb_inc_vat = 150 * rate_150;
    process_kwh = process_kwh - 150;
//250kwh 151-400
    if (process_kwh > 250) {
        thb_inc_vat = thb_inc_vat + (250 * rate_250);
        process_kwh = process_kwh - 250;
//400kwh 401+
        thb_inc_vat = thb_inc_vat + (process_kwh * rate_400);
    }
    else{
        thb_inc_vat = thb_inc_vat + (process_kwh * rate_250);
    }
}
else {
    thb_inc_vat = process_kwh * rate_150;
}

//msg.thb_inc_vat = msg.thb_exc_vate + (msg.thb_exc_vate * 0.07);
thb_total = rate_service + thb_inc_vat + ft_inc_vat;
msg.thb_total = parseFloat(thb_total.toFixed(2));

thb_fee = thb_total - thb_inc_vat;
msg.thb_fee = parseFloat(thb_fee.toFixed(2));

msg.thb_energy = parseFloat(thb_inc_vat.toFixed(2));


return msg;