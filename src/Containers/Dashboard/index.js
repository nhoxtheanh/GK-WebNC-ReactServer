import React from 'react';
import CommonLayout from '../AppLayout';
//import Title from 'app/components/Title';
//import AddBoardButton from 'app/components/AddBoardButton';
import Board from '../../Components/Boards';
// import { StyledDashboard } from './styles';

import moment from 'moment';
// import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
// import { sliceKey, reducer } from './slice';
// import saga from './saga';
// import useHooks from './hooks';

const Dashboard = props => {
  // useInjectSaga({ key: sliceKey, saga });
  // useInjectReducer({ key: sliceKey, reducer });
  // const { handlers, selectors } = useHooks();
  const { boards } = {};////////// gọi API lấy boardslist ở đây

  return (
    <CommonLayout>
        <div className="list">
          {/* <AddBoardButton /> */}
          {boards.map(({ _id, name, createAt }) => (
            <Board
              key={_id}
              name={name}
              time={moment(createAt).format('D MMMM')}
            />
          ))}
        </div>
    </CommonLayout>
  );
};

export default Dashboard;
