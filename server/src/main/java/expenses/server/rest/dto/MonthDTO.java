package expenses.server.rest.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.YearMonth;
import java.util.List;

@AllArgsConstructor
@Getter
public class MonthDTO {

	private final Long id;

	private final YearMonth yearMonth;

	private final Integer length;

	private final List<TransactionDTO> transactions;

	private final List<PredictionDTO> predictions;

}
