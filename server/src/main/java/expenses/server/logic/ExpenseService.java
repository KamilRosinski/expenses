package expenses.server.logic;

import expenses.server.rest.dto.MonthOverviewDTO;

import java.util.List;

public interface ExpenseService {

	List<MonthOverviewDTO> getMonths();

}
