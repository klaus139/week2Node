function findDuplicateTransactions(transactions) {
  const copyTransaction = transactions.slice().sort((a, b) => {
    return a.id - b.id;
 })

 const result = [];
 const timeCheck = (time1, time2) => {
   return (new Date(time1).getTime() - new Date(time2).getTime())/60000;
 }
 
  while(copyTransaction.length > 1){
     const member = [];
     let reference = copyTransaction.shift()

     member.push(reference);
     console.log(member)

     for(let i = 0; i < copyTransaction.length; i++) {
       if(reference.sourceAccount === copyTransaction[i].sourceAccount &&
          reference.targetAccount === copyTransaction[i].targetAccount &&
          reference.amount === copyTransaction[i].amount &&
          reference.category === copyTransaction[i].category && timeCheck(copyTransaction[i].time, reference.time) <= 1){
 
           member.push(copyTransaction[i]);
           reference = copyTransaction[i];
           copyTransaction.splice(i, 1);
           i -= 1;
         }
     }
     if(member.length > 1){
     result.push(member);
     }
   }
  return result;
 }
 export default findDuplicateTransactions;