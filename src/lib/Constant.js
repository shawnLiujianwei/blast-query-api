/**
 * Created by shawn-liu on 17/12/1.
 */
module.exports = {
    BlastDB: {
        Nucl: 'nucleotide',
        Prot: 'protein'
    },
    BlastCommand: {
        Prot: 'blastp',
        Nucl: 'blastn',
        NuclOnProt: 'blastx',
        ProtOnNucl: 'tblaxn'
    },
    SequenceType: {
        DNA: 'dna',
        Protein: 'protein'
    }
};
