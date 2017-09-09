/// <reference path="../node_modules/@types/jquery/index.d.ts" />
class Currency {
    constructor(alias, name, image) {
        this.alias = alias;
        this.name = name;
        this.image = image;
    }
    get imageUrl() {
        return `https://web.poecdn.com/image/Art/2DItems/Currency/${this.image}.png?scale=1&w=1&h=1`;
    }
    toOption() {
        return $('<option>')
            .val(this.alias)
            .text(this.name)
            .css('background-image', `url('${this.imageUrl}')`)
            .attr('selected', 'selected');
    }
    toImg() {
        return `<img src="${this.imageUrl}">`;
    }
}
const currencies = [
    new Currency('alt', 'Orb of Alteration', 'CurrencyRerollMagic'),
    new Currency('fuse', 'Orb of Fusing', 'CurrencyRerollSocketLinks'),
    new Currency('alch', 'Orb of Alchemy', 'CurrencyUpgradeToRare'),
    new Currency('chaos', 'Chaos Orb', 'CurrencyRerollRare'),
    new Currency('gcp', 'Gemcutter\'s Prism', 'CurrencyGemQuality'),
    new Currency('exa', 'Exalted Orb', 'CurrencyAddModToRare'),
    new Currency('chrom', 'Chromatic Orb', 'CurrencyRerollSocketColours'),
    new Currency('jew', 'Jeweller\'s Orb', 'CurrencyRerollSocketNumbers'),
    new Currency('chance', 'Orb of Chance', 'CurrencyUpgradeRandomly'),
    new Currency('chisel', 'Cartographer\'s Chisel', 'CurrencyMapQuality'),
    new Currency('scour', 'Orb of Scouring', 'CurrencyConvertToNormal'),
    new Currency('blessed', 'Blessed Orb', 'CurrencyImplicitMod'),
    new Currency('regret', 'Orb of Regret', 'CurrencyPassiveSkillRefund'),
    new Currency('regal', 'Regal Orb', 'CurrencyUpgradeMagicToRare'),
    new Currency('divine', 'Divine Orb', 'CurrencyModValues')
];
const rates = new Map([
    ['alt', 0.07],
    ['fuse', 0.45],
    ['alch', 0.20],
    ['chaos', 1.00],
    ['gcp', 0.58],
    ['exa', 40.00],
    ['chrom', 0.08],
    ['jew', 0.11],
    ['chance', 0.13],
    ['chisel', 0.31],
    ['scour', 0.50],
    ['blessed', 0.43],
    ['regret', 0.90],
    ['regal', 0.50],
    ['divine', 10.00],
]);
class CurrencyAmount {
    constructor(currency, rate) {
        this.currency = currency;
        this.amount = 1;
        this.rate = rate;
    }
    get chaos() {
        return this.amount * this.rate;
    }
    set chaos(value) {
        this.amount = Math.floor(value / this.rate);
    }
    next() {
        this.amount += 1;
    }
    toRow() {
        let chaos = $('<td>').html(`${this.chaos.toFixed(2)} ${CurrencyAmount.base.toImg()} ${CurrencyAmount.base.name}`);
        let currency = $('<td>').html(`${this.amount} ${this.currency.toImg()} ${this.currency.name}`);
        return $('<tr>').append(chaos).append(currency);
    }
}
CurrencyAmount.base = currencies.find(c => c.alias == 'chaos');
let amounts;
function buildAmmounts(aliases) {
    amounts = [];
    for (let alias of aliases) {
        let currency = currencies.find(c => c.alias == alias);
        let rate = rates.get(alias);
        let amount = new CurrencyAmount(currency, rate);
        amounts.push(amount);
    }
}
function fillSelectOptions(selector) {
    const select = $(selector);
    currencies
        .map(c => c.toOption())
        .forEach(o => select.append(o));
    select.attr('size', currencies.length);
    select.change(function () {
        const aliases = $(this).val();
        const end = 100;
        buildAmmounts(aliases);
        fillTableRows('#currencies', end);
    }).change();
}
function fillTableRows(selector, end) {
    const tbody = $(selector).children('tbody');
    tbody.empty();
    let rows = [];
    let chaos = 0;
    while (chaos <= end) {
        let min = amounts.map(a => a.chaos).reduce((a, b) => Math.min(a, b));
        let amount = amounts.find(a => a.chaos == min);
        rows.push(amount.toRow());
        chaos = amount.chaos;
        amount.next();
    }
    rows.pop();
    rows.forEach(row => row.appendTo(tbody));
}
$(function () {
    fillSelectOptions('#include');
});
//# sourceMappingURL=app.js.map