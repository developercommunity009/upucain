import { jsPDF } from 'jspdf';


export const MarriedWithChildren = ({
    testatorName,
    state,
    country,
    name,
    percentage,
    contact,
    childNames,
    // beneficiary,
    validators
}) => {

    const doc = new jsPDF();
    let marginTop = 15; // Adjust this value as needed for your desired margin

    // Set up content
    const title = 'CONTRACT WILL (Married Person with children)';
    const currentDate = new Date().toLocaleDateString();

    // Start creating the PDF
    doc.setFont('Roboto', 'bold');
    doc.setFontSize(18);
    doc.text(title, 15, marginTop);


    // Add title and testator's name
    doc.setFontSize(14);
    doc.setFont('Roboto', 'normal');

    let children = '';
    childNames.forEach((child, index) => {
        children += `${child.name}`;
        if (index !== childNames.length - 1) {
            children += ', ';
        }
    });

    let validatorText = '';
    validators.forEach((validator, index) => {
        if (index > 0) {
            if (index === validators.length - 1) {
                validatorText += ' and ';
            } else {
                validatorText += ', ';
            }
        }
        validatorText += `${validator.name}, ${validator.contact}`;
    });

    const childrenInfo = childNames.map((child) => {
        return `${child.name}, ${child.contact} - ${child.percentage}%`;
    });

    const beneficiaryInfo = childNames.map((child) => {
        return `ETH - ${child.percentage}% to ${child.name}, ${child.contact}`;
    });


    const spongeInfo = `${name}, ${contact} - ${percentage}%`;
    const spongebeneficery = `ETH - ${percentage}% to ${name}, ${contact}`;


    // Join formatted child information
    const childrenText = childrenInfo.join('\n');
    const beneText = beneficiaryInfo.join('\n');

    let paragraphLines = doc.splitTextToSize(`LAST WILL AND TESTAMENT OF\n${testatorName}\n\nBE IT KNOWN THIS DAY THAT,\nI, ${testatorName}, of ${country}, ${state}, being of legal age and of sound and disposing mind and memory, and not acting under duress, menace, fraud, or undue influence of any person, do make, declare and publish this to be my Will.\n\nArticle 1: Marital and Family Status\nI am married to ${name} and we have the following children: ${children}.\n\nArticle 2: Digital Assets and Debts\nI direct my Validators to ensure that any outstanding digital asset-related debts or expenses are paid from my digital estate. This includes any fees, subscriptions, or obligations related to my online accounts, digital wallets, cryptocurrencies, nonfungible tokens (NFTs), and other digital properties.\n\nArticle 3: Digital Asset Bequests\nI give, devise and bequeath the following digital assets to the named beneficiaries:\n\n${spongebeneficery}\n${beneText}\n\nArticle 4: Residuary Digital Estate\nI give, devise and bequeath all the rest and remainder of my digital estate, including but not limited to online accounts, digital wallets, cryptocurrencies, NFTs, and other digital properties, to the following beneficiaries in the specified shares:\n\n${spongeInfo}\n${childrenText}\n\nArticle 5: Appointment of Validators\nI hereby appoint ${validatorText}, as Validators of my digital estate and this Will. Upon my passing, the Validators shall verify my death using the appropriate documentation and then trigger the execution of this will by the smart contract.\n\nArticle 6: Validator Powers\nThe Validators shall have the authority to access my digital accounts and assets, verify my death, and provide the necessary proof to the smart contract in order to execute the distributions outlined in this will. The Validators shall not have the power to modify or override the terms of this will.\n\nArticle 7: Smart Contract Execution\nUpon verification of my death by the Validators, this will shall be executed by a smart contract on the Ethereum blockchain. The smart contract shall distribute my digital assets and properties according to the terms outlined in this will.\n\nArticle 8: Interpretation\nThis Will shall be interpreted according to the laws of the State of ${state}.\n\nIn witness whereof, I have signed this Will on ${currentDate}.\n\n${testatorName}`, 180);


    let lines = doc.splitTextToSize(paragraphLines, 180);
    let lineHeight = 7; // Adjust line height as needed
    let y = marginTop + 15;
    lines.forEach(line => {
        if (y + lineHeight > doc.internal.pageSize.height) {
            doc.addPage();
            y = 15;
        }
        doc.text(15, y, line);
        y += lineHeight; // Reduce the value to reduce space between lines
    });

    const pdfContent = doc.output('arraybuffer');
    const pdfBlob = new Blob([pdfContent], { type: 'application/pdf' });
    const pdfFile = new File([pdfBlob], 'will.pdf');
    return [pdfFile];

}


export const MarriedWithNoChildren = ({
    testatorName,
    state,
    country,
    name,
    percentage,
    contact,
    childNames,
    validators
}) => {

    const doc = new jsPDF();
    let marginTop = 15; // Adjust this value as needed for your desired margin

    // Set up content
    const title = 'CONTRACT WILL (married person, no children)';
    const currentDate = new Date().toLocaleDateString();

    // Start creating the PDF
    doc.setFont('Roboto', 'bold');
    doc.setFontSize(18);
    doc.text(title, 15, marginTop);


    // Add title and testator's name
    doc.setFontSize(14);
    doc.setFont('Roboto', 'normal');

    let validatorText = '';
    validators.forEach((validator, index) => {
        if (index > 0) {
            if (index === validators.length - 1) {
                validatorText += ' and ';
            } else {
                validatorText += ', ';
            }
        }
        validatorText += `${validator.name}, ${validator.contact}`;
    });

    const childrenInfo = childNames.map((child) => {
        return `${child.name}, ${child.contact} - ${child.percentage}%`;
    });


    const beneficiaryInfo = childNames.map((child) => {
        return `ETH - ${child.percentage}% to ${child.name}, ${child.contact}`;
    });

    const spongeInfo = `${name}, ${contact} - ${percentage}%`;
    const spongebeneficery = `ETH - ${percentage}% to ${name}, ${contact}`;

    // Join formatted child information
    const childrenText = childrenInfo.join('\n');
    const beneText = beneficiaryInfo.join('\n');

    let paragraphLines = doc.splitTextToSize(`LAST WILL AND TESTAMENT OF\n${testatorName}\n\nBE IT KNOWN THIS DAY THAT,\nI, ${testatorName}, of ${country}, ${state}, being of legal age and of sound and disposing mind and memory, and not acting under duress, menace, fraud, or undue influence of any person, do make, declare and publish this to be my Will.\n\nArticle 1: Marital and Family Status\nI am married to ${name} and we have no children.\n\nArticle 2: Digital Assets and Debts\nI direct my Validators to ensure that any outstanding digital asset-related debts or expenses are paid from my digital estate. This includes any fees, subscriptions, or obligations related to my online accounts, digital wallets, cryptocurrencies, nonfungible tokens (NFTs), and other digital properties.\n\nArticle 3: Digital Asset Bequests\nI give, devise and bequeath the following digital assets to the named beneficiaries:\n\n${spongebeneficery}\n${beneText}\n\nArticle 4: Residuary Digital Estate\nI give, devise and bequeath all the rest and remainder of my digital estate, including but not limited to online accounts, digital wallets, cryptocurrencies, NFTs, and other digital properties, to the following beneficiaries in the specified shares:\n\n${spongeInfo}\n${childrenText}\n\nArticle 5: Appointment of Validators\nI hereby appoint ${validatorText}, as Validators of my digital estate and this Will. Upon my passing, the Validators shall verify my death using the appropriate documentation and then trigger the execution of this will by the smart contract.\n\nArticle 6: Validator Powers\nThe Validators shall have the authority to access my digital accounts and assets, verify my death, and provide the necessary proof to the smart contract in order to execute the distributions outlined in this will. The Validators shall not have the power to modify or override the terms of this will.\n\nArticle 7: Smart Contract Execution\nUpon verification of my death by the Validators, this will shall be executed by a smart contract on the Ethereum blockchain. The smart contract shall distribute my digital assets and properties according to the terms outlined in this will.\n\nArticle 8: Interpretation\nThis Will shall be interpreted according to the laws of the State of ${state}.\n\nIn witness whereof, I have signed this Will on ${currentDate}.\n\n${testatorName}`, 180);


    let lines = doc.splitTextToSize(paragraphLines, 180);
    let lineHeight = 7; // Adjust line height as needed
    let y = marginTop + 15;
    lines.forEach(line => {
        if (y + lineHeight > doc.internal.pageSize.height) {
            doc.addPage();
            y = 15;
        }
        doc.text(15, y, line);
        y += lineHeight; // Reduce the value to reduce space between lines
    });

    const pdfContent = doc.output('arraybuffer');
    const pdfBlob = new Blob([pdfContent], { type: 'application/pdf' });
    const pdfFile = new File([pdfBlob], 'will.pdf');
    return [pdfFile];

}


export const UnmarriedWithSignificant = ({
    testatorName,
    state,
    country,
    name,
    percentage,
    contact,
    childNames,
    beneficiary,
    validators
}) => {

    const doc = new jsPDF();
    let marginTop = 15; // Adjust this value as needed for your desired margin

    // Set up content
    const title = 'CONTRACT WILL (Unmarried with Significant Other) ';
    const currentDate = new Date().toLocaleDateString();

    // Start creating the PDF
    doc.setFont('Roboto', 'bold');
    doc.setFontSize(18);
    doc.text(title, 15, marginTop);


    // Add title and testator's name
    doc.setFontSize(14);
    doc.setFont('Roboto', 'normal');

    let validatorText = '';
    validators.forEach((validator, index) => {
        if (index > 0) {
            if (index === validators.length - 1) {
                validatorText += ' and ';
            } else {
                validatorText += ', ';
            }
        }
        validatorText += `${validator.name}, ${validator.contact}`;
    });

    const childrenInfo = childNames.map((child) => {
        return `${child.name}, ${child.contact} - ${child.percentage}%`;
    });


    const beneficiaryInfo = childNames.map((child) => {
        return `ETH - ${child.percentage}% to ${child.name}, ${child.contact}`;
    });


    const spongeInfo = `${name}, ${contact} - ${percentage}%`;
    const spongebeneficery = `ETH - ${percentage}% to ${name}, ${contact}`;


    // Join formatted child information
    const childrenText = childrenInfo.join('\n');
    const beneText = beneficiaryInfo.join('\n');

    let paragraphLines = doc.splitTextToSize(`LAST WILL AND TESTAMENT OF\n${testatorName}\n\nBE IT KNOWN THIS DAY THAT,\nI, ${testatorName}, of ${country}, ${state}, being of legal age and of sound and disposing mind and memory, and not acting under duress, menace, fraud, or undue influence of any person, do make, declare and publish this to be my Will.\n\nArticle 1: Relationship Status\nI am unmarried but have a significant other named ${name}.\n\nArticle 2: Digital Assets and Debts\nI direct my Validators to ensure that any outstanding digital asset-related debts or expenses are paid from my digital estate. This includes any fees, subscriptions, or obligations related to my online accounts, digital wallets, cryptocurrencies, nonfungible tokens (NFTs), and other digital properties.\n\nArticle 3: Digital Asset Bequests\nI give, devise and bequeath the following digital assets to the named beneficiaries:\n\n${spongebeneficery}\n${beneText}\n\nArticle 4: Residuary Digital Estate\nI give, devise and bequeath all the rest and remainder of my digital estate, including but not limited to online accounts, digital wallets, cryptocurrencies, NFTs, and other digital properties, to the following beneficiaries in the specified shares:\n\n${spongeInfo}\n${childrenText}\n\nArticle 5: Appointment of Validators\nI hereby appoint ${validatorText}, as Validators of my digital estate and this Will. Upon my passing, the Validators shall verify my death using the appropriate documentation and then trigger the execution of this will by the smart contract.\n\nArticle 6: Validator Powers\nThe Validators shall have the authority to access my digital accounts and assets, verify my death, and provide the necessary proof to the smart contract in order to execute the distributions outlined in this will. The Validators shall not have the power to modify or override the terms of this will.\n\nArticle 7: Smart Contract Execution\nUpon verification of my death by the Validators, this will shall be executed by a smart contract on the Ethereum blockchain. The smart contract shall distribute my digital assets and properties according to the terms outlined in this will.\n\nArticle 8: Interpretation\nThis Will shall be interpreted according to the laws of the State of ${state}.\n\nIn witness whereof, I have signed this Will on ${currentDate}.\n\n${testatorName}`, 180);


    let lines = doc.splitTextToSize(paragraphLines, 180);
    let lineHeight = 7; // Adjust line height as needed
    let y = marginTop + 15;
    lines.forEach(line => {
        if (y + lineHeight > doc.internal.pageSize.height) {
            doc.addPage();
            y = 15;
        }
        doc.text(15, y, line);
        y += lineHeight; // Reduce the value to reduce space between lines
    });



    const pdfContent = doc.output('arraybuffer');
    const pdfBlob = new Blob([pdfContent], { type: 'application/pdf' });
    const pdfFile = new File([pdfBlob], 'will.pdf');
    return [pdfFile];

}


export const SignlePersonUnAttach = ({
    testatorName,
    state,
    country,
    childNames,
    validators
}) => {

    const doc = new jsPDF();
    let marginTop = 15; // Adjust this value as needed for your desired margin

    // Set up content
    const title = 'CONTRACT WILL (Single person, unattached)';
    const currentDate = new Date().toLocaleDateString();

    // Start creating the PDF
    doc.setFont('Roboto', 'bold');
    doc.setFontSize(18);
    doc.text(title, 15, marginTop);


    // Add title and testator's name
    doc.setFontSize(14);
    doc.setFont('Roboto', 'normal');

    let validatorText = '';
    validators.forEach((validator, index) => {
        if (index > 0) {
            if (index === validators.length - 1) {
                validatorText += ' and ';
            } else {
                validatorText += ', ';
            }
        }
        validatorText += `${validator.name}, ${validator.contact}`;
    });

    const childrenInfo = childNames.map((child) => {
        return `${child.name}, ${child.contact} - ${child.percentage}%`;
    });

    const beneficiaryInfo = childNames.map((child) => {
        return `ETH - ${child.percentage}% to ${child.name}, ${child.contact}`;
    });

    // Join formatted child information
    const childrenText = childrenInfo.join('\n');
    const beneText = beneficiaryInfo.join('\n');

    let paragraphLines = doc.splitTextToSize(`LAST WILL AND TESTAMENT OF\n${testatorName}\n\nBE IT KNOWN THIS DAY THAT,\nI, ${testatorName}, of ${country}, ${state}, being of legal age and of sound and disposing mind and memory, and not acting under duress, menace, fraud, or undue influence of any person, do make, declare and publish this to be my Will.\n\nArticle 1: Relationship Status\nI am single and unattached, with no spouse or significant other.\n\nArticle 2: Digital Assets and Debts\nI direct my Validators to ensure that any outstanding digital asset-related debts or expenses are paid from my digital estate. This includes any fees, subscriptions, or obligations related to my online accounts, digital wallets, cryptocurrencies, nonfungible tokens (NFTs), and other digital properties.\n\nArticle 3: Digital Asset Bequests\nI give, devise and bequeath the following digital assets to the named beneficiaries:\n\n${beneText}\n\nArticle 4: Residuary Digital Estate\nI give, devise and bequeath all the rest and remainder of my digital estate, including but not limited to online accounts, digital wallets, cryptocurrencies, NFTs, and other digital properties, to the following beneficiaries in the specified shares:\n\n${childrenText}\n\nArticle 5: Appointment of Validators\nI hereby appoint ${validatorText}, as Validators of my digital estate and this Will. Upon my passing, the Validators shall verify my death using the appropriate documentation and then trigger the execution of this will by the smart contract.\n\nArticle 6: Validator Powers\nThe Validators shall have the authority to access my digital accounts and assets, verify my death, and provide the necessary proof to the smart contract in order to execute the distributions outlined in this will. The Validators shall not have the power to modify or override the terms of this will.\n\nArticle 7: Smart Contract Execution\nUpon verification of my death by the Validators, this will shall be executed by a smart contract on the Ethereum blockchain. The smart contract shall distribute my digital assets and properties according to the terms outlined in this will.\n\nArticle 8: Interpretation\nThis Will shall be interpreted according to the laws of the State of ${state}.\n\nIn witness whereof, I have signed this Will on ${currentDate}.\n\n${testatorName}`, 180);


    let lines = doc.splitTextToSize(paragraphLines, 180);
    let lineHeight = 7; // Adjust line height as needed
    let y = marginTop + 15;
    lines.forEach(line => {
        if (y + lineHeight > doc.internal.pageSize.height) {
            doc.addPage();
            y = 15;
        }
        doc.text(15, y, line);
        y += lineHeight; // Reduce the value to reduce space between lines
    });



    const pdfContent = doc.output('arraybuffer');
    const pdfBlob = new Blob([pdfContent], { type: 'application/pdf' });
    const pdfFile = new File([pdfBlob], 'will.pdf');
    return [pdfFile];

}


export const WindowWithChildren = ({
    testatorName,
    state,
    country,
    childNames,
    beneficiary,
    validators
}) => {

    const doc = new jsPDF();
    let marginTop = 15; // Adjust this value as needed for your desired margin

    // Set up content
    const title = 'CONTRACT WILL (widowed/widower with children) ';
    const currentDate = new Date().toLocaleDateString();

    // Start creating the PDF
    doc.setFont('Roboto', 'bold');
    doc.setFontSize(18);
    doc.text(title, 15, marginTop);



    // Add title and testator's name
    doc.setFontSize(14);
    doc.setFont('Roboto', 'normal');

    let validatorText = '';
    validators.forEach((validator, index) => {
        if (index > 0) {
            if (index === validators.length - 1) {
                validatorText += ' and ';
            } else {
                validatorText += ', ';
            }
        }
        validatorText += `${validator.name}, ${validator.contact}`;
    });

    let children = '';
    childNames.forEach((child, index) => {
        children += `${child.name}`;
        if (index !== childNames.length - 1) {
            children += ', ';
        }
    });

    const childrenInfo = childNames.map((child) => {
        return `${child.name}, ${child.contact} - ${child.percentage}%`;
    });


    const beneficiaryInfo = childNames.map((child) => {
        return `ETH - ${child.percentage}% to ${child.name}, ${child.contact}`;
    });


    // Join formatted child information
    const childrenText = childrenInfo.join('\n');
    const beneText = beneficiaryInfo.join('\n');

    let paragraphLines = doc.splitTextToSize(`LAST WILL AND TESTAMENT OF\n${testatorName}\n\nBE IT KNOWN THIS DAY THAT,\nI, ${testatorName}, of ${country}, ${state}, being of legal age and of sound and disposing mind and memory, and not acting under duress, menace, fraud, or undue influence of any person, do make, declare and publish this to be my Will.\n\nArticle 1: Article 1: Marital and Family Status\nI am a widowed/widower and have the following children: ${children}.\n\nArticle 2: Digital Assets and Debts\nI direct my Validators to ensure that any outstanding digital asset-related debts or expenses are paid from my digital estate. This includes any fees, subscriptions, or obligations related to my online accounts, digital wallets, cryptocurrencies, nonfungible tokens (NFTs), and other digital properties.\n\nArticle 3: Digital Asset Bequests\nI give, devise and bequeath the following digital assets to the named beneficiaries:\n\n${beneText}\n\nArticle 4: Residuary Digital Estate\nI give, devise and bequeath all the rest and remainder of my digital estate, including but not limited to online accounts, digital wallets, cryptocurrencies, NFTs, and other digital properties, to the following beneficiaries in the specified shares:\n\n${childrenText}\n\nArticle 5: Appointment of Validators\nI hereby appoint ${validatorText}, as Validators of my digital estate and this Will. Upon my passing, the Validators shall verify my death using the appropriate documentation and then trigger the execution of this will by the smart contract.\n\nArticle 6: Validator Powers\nThe Validators shall have the authority to access my digital accounts and assets, verify my death, and provide the necessary proof to the smart contract in order to execute the distributions outlined in this will. The Validators shall not have the power to modify or override the terms of this will.\n\nArticle 7: Smart Contract Execution\nUpon verification of my death by the Validators, this will shall be executed by a smart contract on the Ethereum blockchain. The smart contract shall distribute my digital assets and properties according to the terms outlined in this will.\n\nArticle 8: Interpretation\nThis Will shall be interpreted according to the laws of the State of ${state}.\n\nIn witness whereof, I have signed this Will on ${currentDate}.\n\n${testatorName}`, 180);


    let lines = doc.splitTextToSize(paragraphLines, 180);
    let lineHeight = 7; // Adjust line height as needed
    let y = marginTop + 15;
    lines.forEach(line => {
        if (y + lineHeight > doc.internal.pageSize.height) {
            doc.addPage();
            y = 15;
        }
        doc.text(15, y, line);
        y += lineHeight; // Reduce the value to reduce space between lines
    });



    const pdfContent = doc.output('arraybuffer');
    const pdfBlob = new Blob([pdfContent], { type: 'application/pdf' });
    const pdfFile = new File([pdfBlob], 'will.pdf');
    return [pdfFile];

}


export const SignleWithChildren = ({
    testatorName,
    state,
    country,
    childNames,
    validators
}) => {

    const doc = new jsPDF();
    let marginTop = 15; // Adjust this value as needed for your desired margin

    // Set up content
    const title = 'CONTRACT WILL (Single, unattached person with children)';
    const currentDate = new Date().toLocaleDateString();

    // Start creating the PDF
    doc.setFont('Roboto', 'bold');
    doc.setFontSize(18);
    doc.text(title, 15, marginTop);



    // Add title and testator's name
    doc.setFontSize(14);
    doc.setFont('Roboto', 'normal');

    let validatorText = '';
    validators.forEach((validator, index) => {
        if (index > 0) {
            if (index === validators.length - 1) {
                validatorText += ' and ';
            } else {
                validatorText += ', ';
            }
        }
        validatorText += `${validator.name}, ${validator.contact}`;
    });

    let children = '';
    childNames.forEach((child, index) => {
        children += `${child.name}`;
        if (index !== childNames.length - 1) {
            children += ', ';
        }
    });

    const childrenInfo = childNames.map((child) => {
        return `${child.name}, ${child.contact} - ${child.percentage}%`;
    });


    const beneficiaryInfo = childNames.map((child) => {
        return `ETH - ${child.percentage}% to ${child.name}, ${child.contact}`;
    });


    // Join formatted child information
    const childrenText = childrenInfo.join('\n');
    const beneText = beneficiaryInfo.join('\n');

    let paragraphLines = doc.splitTextToSize(`LAST WILL AND TESTAMENT OF\n${testatorName}\n\nBE IT KNOWN THIS DAY THAT,\nI, ${testatorName}, of ${country}, ${state}, being of legal age and of sound and disposing mind and memory, and not acting under duress, menace, fraud, or undue influence of any person, do make, declare and publish this to be my Will.\n\nArticle 1: Article 1: Marital and Family Status\nI am single and unattached, with no spouse or significant other. I have the following children: ${children}.\n\nArticle 2: Digital Assets and Debts\nI direct my Validators to ensure that any outstanding digital asset-related debts or expenses are paid from my digital estate. This includes any fees, subscriptions, or obligations related to my online accounts, digital wallets, cryptocurrencies, nonfungible tokens (NFTs), and other digital properties.\n\nArticle 3: Digital Asset Bequests\nI give, devise and bequeath the following digital assets to the named beneficiaries:\n\n${beneText}\n\nArticle 4: Residuary Digital Estate\nI give, devise and bequeath all the rest and remainder of my digital estate, including but not limited to online accounts, digital wallets, cryptocurrencies, NFTs, and other digital properties, to the following beneficiaries in the specified shares:\n\n${childrenText}\n\nArticle 5: Appointment of Validators\nI hereby appoint ${validatorText}, as Validators of my digital estate and this Will. Upon my passing, the Validators shall verify my death using the appropriate documentation and then trigger the execution of this will by the smart contract.\n\nArticle 6: Validator Powers\nThe Validators shall have the authority to access my digital accounts and assets, verify my death, and provide the necessary proof to the smart contract in order to execute the distributions outlined in this will. The Validators shall not have the power to modify or override the terms of this will.\n\nArticle 7: Smart Contract Execution\nUpon verification of my death by the Validators, this will shall be executed by a smart contract on the Ethereum blockchain. The smart contract shall distribute my digital assets and properties according to the terms outlined in this will.\n\nArticle 8: Interpretation\nThis Will shall be interpreted according to the laws of the State of ${state}.\n\nIn witness whereof, I have signed this Will on ${currentDate}.\n\n${testatorName}`, 180);


    let lines = doc.splitTextToSize(paragraphLines, 180);
    let lineHeight = 7; // Adjust line height as needed
    let y = marginTop + 15;
    lines.forEach(line => {
        if (y + lineHeight > doc.internal.pageSize.height) {
            doc.addPage();
            y = 15;
        }
        doc.text(15, y, line);
        y += lineHeight; // Reduce the value to reduce space between lines
    });


    const pdfContent = doc.output('arraybuffer');
    const pdfBlob = new Blob([pdfContent], { type: 'application/pdf' });
    const pdfFile = new File([pdfBlob], 'will.pdf');
    return [pdfFile];

}