// import React, { useState, useEffect } from 'react';
// import { AntSelect, AntInputNumber, StyledSelect } from '../../../styled';
// import {
//   Icon,
//   Radio,
//   Checkbox,
//   DatePicker,
//   InputNumber,
//   Modal,
//   Option,
// } from 'antd';
// import moment from 'moment';
// import styled from 'styled-components';

// export const RecurringInfoEditForm = props => {
//   const {
//     localState,
//     setLocalState,
//     handleReviewSubmit,
//     handlePageBack,
//   } = props;
//   const dayOptions = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

//   const timePeriodOptions = ['Day', 'Week', 'Month'];

//   const monthlyOptions = [
//     `Monthly on day ${localState.dynamicNumber}`,
//     `Monthly on ${localState.dynamicNth} ${localState.dynamicDay}`,
//   ];

//   const repeatTimePeriodOptions = [
//     'Daily',
//     'Every Weekday',
//     `Weekly on ${localState.dynamicDay}`,
//   ];

//   if (localState.dynamicNth !== 'Fifth') {
//     repeatTimePeriodOptions.push(
//       `Monthly on the ${localState.dynamicNth} ${localState.dynamicDay} `
//     );
//   }

//   repeatTimePeriodOptions.push(`Annually on ${localState.dynamicYear}`);
//   repeatTimePeriodOptions.push('Custom');

//   const closeModal = () => {
//     setFormState({
//       ...formState,
//       recurringBoolean: false,
//     });
//   };

//   const handleCheckBox = checked => {
//     setLocalState({
//       ...localState,
//       recurringEvent: checked.target.value,
//     });
//   };

//   const handleRepeatPeriod = period => {
//     if (period === 'Custom') {
//       setFormState({
//         ...formState,
//         recurringBoolean: true,
//       });
//     }
//     setLocalState({
//       ...localState,
//       recurringInfo: {
//         ...localState.recurringInfo,
//         repeatTimePeriod: period,
//       },
//     });
//   };

//   const handleOccurrenceEndDate = date => {
//     setLocalState({
//       ...localState,
//       recurringInfo: {
//         ...localState.recurringInfo,
//         occurrenceEndDate: date.unix(),
//       },
//     });
//   };
//   const handleOccurrences = occurrence => {
//     setLocalState({
//       ...localState,
//       recurringInfo: {
//         ...localState.recurringInfo,
//         occurrenceEnds: occurrence.target.value,
//       },
//     });
//   };
//   const handleOccurrencesEndsAfter = number => {
//     setLocalState({
//       ...localState,
//       recurringInfo: {
//         ...localState.recurringInfo,
//         occurrenceEndsAfter: number,
//       },
//     });
//   };
//   const handleEveryValue = value => {
//     setLocalState({
//       ...localState,
//       recurringInfo: {
//         ...localState.recurringInfo,
//         repeatEveryValue: value,
//       },
//     });
//   };
//   const handleRepeatEvery = value => {
//     setLocalState({
//       ...localState,
//       recurringInfo: {
//         ...localState.recurringInfo,
//         repeatEvery: value,
//       },
//     });
//   };

//   const handleSubmit = values => {
//     console.log(values);
//     setLocalState({
//       ...localState,
//       recurringInfo: {
//         ...localState.recurringInfo,
//         ...values,
//       },
//     });
//     setFormState({
//       recurringBoolean: false,
//     });
//   };

//   const periodOfTime = timePeriodOptions.map(period => {
//     if (localState.recurringInfo.repeatEvery > 1) {
//       return (
//         <Option key={period} value={period + 's'}>
//           {period + 's'}
//         </Option>
//       );
//     } else {
//       return (
//         <Option key={period} value={period}>
//           {period}
//         </Option>
//       );
//     }
//   });

//   const repeatTimePeriod = repeatTimePeriodOptions.map(period => {
//     return (
//       <Option key={period} value={period}>
//         {period}
//       </Option>
//     );
//   });

//   const monthlyPeriod = monthlyOptions.map(period => {
//     return (
//       <Option key={period} value={period}>
//         {period}
//       </Option>
//     );
//   });
//   return (
//     <StyledDiv className={'flex center'}>
//       <Radio.Group
//         defaultValue={localState.recurringEvent === 'Yes' ? 'Yes' : 'No'}
//         // onChange={handleCheckBox}

//         className={'radioWrapper'}
//         style={{ marginLeft: 100 }}
//       >
//         <Radio value={'Yes'}>Yes</Radio>
//         <Radio value={'No'}>No</Radio>
//       </Radio.Group>
//       <StyledSelect
//         style={{ width: 200 }}
//         name={'Repeat Time Period'}
//         defaultValue={localState.recurringInfo.repeatTimePeriod}
//         value={localState.recurringInfo.repeatTimePeriod}
//         // onChange={handleRepeatPeriod}
//       >
//         {/* {repeatTimePeriod} */}
//       </StyledSelect>
//       <Radio.Group
//         name={'Occurrence Ends'}
//         valuie={localState.recurringInfo.occurrenceEnds}
//         defaultValue={localState.recurringInfo.occurrenceEnds}
//         // onChange={handleOccurrences}
//         className={'radioWrapper'}
//       >
//         <Radio value={'On'}>On</Radio>
//         <Radio value={'After'}>After</Radio>
//         <Radio value={'Never'}>Never</Radio>
//       </Radio.Group>
//       <DatePicker
//         name={'Occurrence End Date'}
//         defaultValue={moment(localState.recurringInfo.occurrenceEndsAfter)}
//         value={localState.recurringInfoEndDate}
//         // onChange={handleOccurrenceEndDate}
//         disabledDate={current => current && current < moment().endOf('day')}
//         // disabled={
//         //   localState.recurringInfo.occurrenceEnds === 'On' ? false : true
//         // }
//       />
//       <InputNumber
//         style={{ width: 50 }}
//         name={'Occurrence Ends After'}
//         min={0}
//         defaultValue={localState.occurrenceEndsAfter}
//         value={localState.recurringInfo.occurrenceEndsAfter}
//         // onChange={handleOccurrencesEndsAfter}
//         disabled={
//           localState.recurringInfo.occurrenceEnds === 'After' ? false : true
//         }
//       />
//       <Modal
//         title="Add a recurring event"
//         width={720}
//         // onClose={closeModal}
//         // visible={formState.recurringBoolean}
//         footer={null}
//       >
//         <AntInputNumber
//           name={'Repeat every'}
//           value={localState.recurringInfo.repeatEvery}
//           defaultValue={localState.recurringInfo.repeatEvery}
//           style={{ width: 100 }}
//           // onChange={handleRepeatEvery}
//           min={0}
//         />
//         <AntSelect
//           style={{ width: 100 }}
//           value={localState.recurringInfo.repeatEveryValue}
//           defaultValue={localState.recurringInfo.repeatEveryValue}
//           name={'Repeat every value'}
//           // onChange={handleEveryValue}
//         >
//           {/* {periodOfTime} */}
//         </AntSelect>
//         {localState.recurringInfo.repeatEveryValue === 'Week' && (
//           <Checkbox.Group
//             name={'Days'}
//             value={localState.recurringInfo.days}
//             defaultValue={localState.recurringInfo.days}
//             notRequired
//           />
//         )}
//         {localState.recurringInfo.repeatEveryValue === 'Weeks' && (
//           <Checkbox.Group
//             name={'Days'}
//             value={localState.recurringInfo.days}
//             defaultValue={localState.recurringInfo.days}
//             notRequired
//           />
//         )}
//         {localState.recurringInfo.repeatEveryValue === 'Month' && (
//           <AntSelect
//             name={'Monthly Period'}
//             value={localState.recurringInfo.monthlyPeriod}
//             defaultValue={localState.recurringInfo.monthlyPeriod}
//             notRequired
//           >
//             {/* {monthlyPeriod} */}
//           </AntSelect>
//         )}
//         {localState.recurringInfo.repeatEveryValue === 'Months' && (
//           <AntSelect
//             name={'Monthly Period'}
//             value={localState.recurringInfo.monthlyPeriod}
//             defaultValue={localState.recurringInfo.monthlyPeriod}
//             notRequired
//           >
//             {/* {monthlyPeriod} */}
//           </AntSelect>
//         )}
//       </Modal>
//     </StyledDiv>
//   );
// };

// const StyledDiv = styled.div`
//   display: flex;
//   flex-direction: column;
//   h1 {
//     color: ${props => props.theme.primary8};
//   }

//   h4 {
//     color: ${props => props.theme.primary8};
//   }
//   padding: 2rem;
// `;

// export default RecurringInfoEditForm;
