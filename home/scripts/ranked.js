function getRankedStats() {
    let accountId = localStorage.accountId

    let requestData = getRequestData('ranked?account=' + accountId)
    let divisionImgs = [
        'Bronze_1',
        'Bronze_2',
        'Bronze_3',
        'Silver_1',
        'Silver_2',
        'Silver_3',
        'Gold_1',
        'Gold_2',
        'Gold_3',
        'Platinum_1',
        'Platinum_2',
        'Platinum_3',
        'Diamond_1',
        'Diamond_2',
        'Diamond_3',
        'Elite',
        'Champion',
        'Unreal'
    ]

    let battleRoyalePB = document.getElementById('br-ranked-progress')
    let zeroBuildPB = document.getElementById('zb-ranked-progress')
    let delMarPB = document.getElementById('dc-ranked-progress')

    let battleRoyalePBImg = document.getElementById('br-rank-img')
    let zeroBuildPBImg = document.getElementById('zb-rank-img')
    let delMarPBImg = document.getElementById('dm-rank-img')

    fetch(requestData.url, requestData.data).then(shop => shop.json()).then(data => {
        let battleRoyale = data.rankedData.find(obj => obj.rankingType === "ranked-br");
        let zeroBuild = data.rankedData.find(obj => obj.rankingType === "ranked-zb");
        let delMar = data.rankedData.find(obj => obj.rankingType === "delmar-competitive");

        let brText = document.getElementById('br-rank-text')
        let zbText = document.getElementById('zb-rank-text')
        let dmText = document.getElementById('dm-rank-text')

        let brProgress = battleRoyale.promotionProgress * 100
        let zbProgress = zeroBuild.promotionProgress * 100
        let dmProgress = delMar.promotionProgress * 100
        let modifierActive = true

        let brDivision = battleRoyale.currentDivision.level
        let zbDivision = zeroBuild.currentDivision.level
        let dmDivision = delMar.currentDivision.level

        battleRoyalePB.style = '--end-progress-value:' + brProgress + '; animation: progress 2s 1 forwards; --progress-value:' + localStorage.rankedBRP
        zeroBuildPB.style = '--end-progress-value:' + zbProgress + '; animation: progress 2s 1 forwards; --progress-value:' + localStorage.rankedZBP
        delMarPB.style = '--end-progress-value:' + dmProgress + '; animation: progress 2s 1 forwards; --progress-value:' + localStorage.rankedDMP

        let unrankedBR = battleRoyale.promotionProgress == 0 && battleRoyale.currentDivision.level == 0
        let unrankedZB = zeroBuild.promotionProgress == 0 && zeroBuild.currentDivision.level == 0
        let unrankedDM = delMar.promotionProgress == 0 && delMar.currentDivision.level == 0

        battleRoyalePBImg.src = 'assets/ranked/' + (unrankedBR ? 'Unranked' : divisionImgs[brDivision]) + '.webp'
        zeroBuildPBImg.src = 'assets/ranked/' + (unrankedZB ? 'Unranked' : divisionImgs[zbDivision]) + '.webp'
        delMarPBImg.src = 'assets/ranked/' + (unrankedDM ? 'Unranked' : divisionImgs[dmDivision]) + '.webp'

        brText.innerText = battleRoyale.currentDivision.name
        zbText.innerText = zeroBuild.currentDivision.name
        dmText.innerText = delMar.currentDivision.name

        if (modifierActive) {
            localStorage.rankedBRP = brProgress
            localStorage.rankedZBP = zbProgress
            localStorage.rankedDMP = dmProgress
            localStorage.brDivision = brDivision
            localStorage.zbDivision = zbDivision
            localStorage.dmDivision = dmDivision
        }
    })
}